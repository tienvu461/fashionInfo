from django.shortcuts import render
from django.http import Http404
from django.db.models import Q

from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import serializers, views, status, mixins, generics, pagination
from rest_framework.exceptions import ValidationError
import logging
import operator
from functools import reduce

from .models import Photo, PhotoLike, PhotoFeature, PhotoComment, GenericConfig
from .serializers import PhotoSerializer, PhotoDetailSerializer, PhotoFeatureSerializer, PhotoSuggestSerializer, PhotoCommentSerializer, PhotoLikeSerializer
from .models import Magazine, MagazineLike, MagazineComment, MagazineCategory, MagazineSubCategory, MagazineFeature
from .serializers import MagazineSerializer, MagazineDetailSerializer, MagazineSuggestSerializer, MagazineCommentSerializer, MagazineLikeSerializer, MagazineCategorySerializer, MagazineSubCategorySerializer, MagazineFeatureSerializer
from .consts import photosConst
from .utils import calc_interactive_pt, striphtml

logger = logging.getLogger("photos")

# class PhotoFilter(filters.FilterSet):
#     price = filters.NumberFilter(name="price", lookup_expr='lte')
#     features = filters.ModelMultipleChoiceFilter(
#         name="features",
#         conjoined=True,
#         queryset=Features.objects.all()
#         )

#     class Meta:
#         model = Room
#         fields = ['price', 'features']


# if request.method == 'POST':
#     print 'Raw Data: "%s"' % request.body

class CustomPaginate(views.APIView):
    page_size = photosConst.PAGE_SIZE
    max_page_size = photosConst.MAX_PAGE_SIZE
    min_limit = 1
    max_limit = max_page_size

    def paginate(self, object_list, page=1, limit=10, **kwargs):

        from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
        try:
            page = int(page)
            if page < 1:
                page = 1
        except (TypeError, ValueError):
            page = 1

        try:
            limit = int(limit)
            if limit < self.min_limit:
                limit = self.min_limit
            if limit > self.max_limit:
                limit = self.max_limit
        except (ValueError, TypeError):
            limit = self.max_limit

        paginator = Paginator(object_list, limit)
        try:
            objects = paginator.page(page)
        except PageNotAnInteger:
            objects = paginator.page(1)
        except EmptyPage:
            objects = paginator.page(paginator.num_pages)
        data = {
            'previous': objects.has_previous() and objects.previous_page_number() or None,
            'next': objects.has_next() and objects.next_page_number() or None,
            'results': list(objects)
        }
        return data


class PhotoList(generics.ListCreateAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    # filter_backends = (filters.DjangoFilterBackend,)
    # filter_class = PhotoFilter

    def list(self, request, *args, **kwargs):
        # getting current user type
        user=self.request.user

        # getting show/hide setting from Generic Config tbl
        config_obj = GenericConfig.objects.filter(in_use=True)
        try:
            show_activities = config_obj.values().first()["show_activities"]
            logger.debug("show_activities = {}".format(show_activities))
        except Exception as e:
            logger.error("Cannot get config\nException: {}".format(e))
            show_activities = True

        # if current user is admin => query all photos from DB, if not only query "Publish" photos
        if user.is_superuser == True:
            queryset = Photo.objects.all()
        else:
            queryset = Photo.objects.filter(status=1)
            
        # queryset = queryset.order_by('-created_at')

        page = self.paginate_queryset(queryset)
        if page is not None:
            if show_activities:
                serializer = self.get_serializer(page, many=True,)
            else:
                serializer = self.get_serializer(
                    page, many=True, removed_fields=('activities',))
            return self.get_paginated_response(serializer.data)

        if show_activities:
            serializer = self.get_serializer(queryset, many=True)
        else:
            serializer = self.get_serializer(
                page, many=True, removed_fields=('activities',))

        return Response(serializer.data)


class PhotoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoDetailSerializer

    def get(self, request, *args, **kwargs):
        # getting current user type and photo
        user=self.request.user
        instance = self.get_object()

        # if current user not is admin and current photo status is "Draft" => raise error 
        if user.is_superuser == False and instance.status == 0:
            return Response({'error':'Only admin can access this photo!'}, status=status.HTTP_400_BAD_REQUEST,)

        # view increment
        instance.view_count = instance.view_count + 1
        instance.save(update_fields=("view_count", ))

        # getting show/hide setting from Generic Config tbl
        config_obj = GenericConfig.objects.filter(in_use=True)
        try:
            show_activities = config_obj.values().first()["show_activities"]
            logger.debug("show_activities = {}".format(show_activities))
        except Exception as e:
            logger.error("Cannot get config\nException: {}".format(e))
            show_activities = True
        if show_activities:
            serializer = self.get_serializer(instance)
        else:
            serializer = self.get_serializer(
                instance, removed_fields=('likes', 'comments',))

        return Response(serializer.data)


class PhotoSearch(views.APIView, pagination.PageNumberPagination):

    def get(self, request):
        searched_tags = request.GET.get('search_text', '').split()
        logger.debug(searched_tags)

        queryset = Photo.objects.filter(
            tags__name__in=searched_tags).distinct()
        queryset = queryset.order_by('-created_at')
        # page = pagination.PageNumberPagination.paginate_queryset(queryset=queryset, request=request)
        page = self.paginate_queryset(queryset, request, view=self)
        if page is not None:
            serializer = PhotoSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        logger.debug(queryset)
        serializer = PhotoSerializer(queryset, many=True)
        return Response(serializer.data)


class PhotoSuggest(CustomPaginate):
    def get(self, request):
        page = request.GET.get("page")
        photo_id = request.GET.get('photo_id')
        logger.debug(photo_id)

        # # getting interactive ratio from Generic Config tbl
        # config_obj = GenericConfig.objects.filter(in_use=True)
        # interactive_ratio = config_obj.values().first()
        # logger.debug("interactive_ratio = {}".format(interactive_ratio))
        # if not interactive_ratio:
        #     logger.error("Config not found")
        #     return Response(status=status.HTTP_400_BAD_REQUEST,)

        try:
            org_queryset = Photo.objects.filter(id=photo_id).distinct()
            org_serializer = PhotoDetailSerializer(org_queryset, many=True)
            # logger.debug(
            #     ("org_queryset data = {}".format(org_serializer.data[0])))

            # get tags list, filter and sort photos having matched tags
            org_tag_list = org_serializer.data[0]["tags"]
            org_photographer = org_serializer.data[0]["detail_info"]["photographer"]
            logger.debug(("tag_list = {}".format(org_tag_list)))

            clauses = ((Q(tags__name__iexact=tag) for tag in org_tag_list))
            query = reduce(operator.or_, clauses)
            similar_photos_queryset = Photo.objects.filter(
                query | Q(photographer__iexact=org_photographer)).distinct()

            # similar_photos_queryset = Photo.objects.filter(tags__name__in=org_tag_list).distinct()
            # similar_photos_queryset = Photo.objects.filter(Q(tags__icontains='candy')|Q(body__icontains='candy'))

            similar_photos_queryset = similar_photos_queryset.exclude(
                id=photo_id)
            similar_photos_serializer = PhotoSerializer(
                similar_photos_queryset, many=True)
            # logger.debug(("similar_photos_serializer data = {}".format(
            # similar_photos_serializer.data)))

            for photo in similar_photos_serializer.data:
                photo['interactive_pt'] = calc_interactive_pt(
                    org_tag_list, photo['tags'], org_photographer, photo['photographer'])

            sorted_suggestion_list = sorted(
                similar_photos_serializer.data, key=lambda k: (-k['interactive_pt']))
            # logger.debug(("ranking list = {}".format(sorted_suggestion_list)))

            similar_photos_serializer = PhotoSuggestSerializer(
                similar_photos_queryset, many=True, context={'org_tag_list': org_tag_list, 'org_photographer': org_photographer})

            return Response(self.paginate(sorted_suggestion_list, page, 6))

            # page = self.paginate_queryset(
            #     similar_photos_queryset, request, view=self)
            # if page is not None:
            #     logger.debug("page = {}".format(page))
            #     similar_photos_serializer = PhotoSuggestSerializer(
            #     page, many=True, context={'org_tag_list': org_tag_list, 'org_photographer': org_photographer})
            #     # sorted_suggestion_list = sorted(
            #     # similar_photos_serializer.data, key=lambda k: (-k['interactive_pt']))
            #     return self.get_paginated_response(similar_photos_serializer.data)

            # return Response(sorted_suggestion_list)

        except IndexError as e:
            logger.error("Cannot get suggestion")
            logger.error("Exception = {}".format(e))
            logger.error("Request: {}".format(request.GET.dict()))
            return Response(status=status.HTTP_400_BAD_REQUEST,)

        # Food.objects.filter(tags__name__in=["delicious"])
        # queryset = Photo.objects.filter(tags__name__in=searched_tags).distinct()
        # queryset = queryset.order_by('-created_at')
        # # page = pagination.PageNumberPagination.paginate_queryset(queryset=queryset, request=request)
        # page = self.paginate_queryset(queryset, request, view=self)
        # if page is not None:
        #     serializer = PhotoSerializer(queryset, many=True)
        #     return self.get_paginated_response(serializer.data)

        # logger.debug(queryset)
        # serializer = PhotoSerializer(queryset, many=True)
        # return Response(status=status.HTTP_200_OK,)

# Get the most trending photo


class PhotoFeatureDetail(views.APIView):
    # queryset = PhotoFeature.objects.all()
    # serializer_class = PhotoFeatureSerializer

    def get(self, request, *args, **kwargs):
        queryset = PhotoFeature.objects.filter(in_use=True)
        if queryset.count() == 0:
            logger.error("Feature photos does not exist")
            return Response("Feature photos does not exist", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        serializer = PhotoFeatureSerializer(queryset, many=True)
        return Response(serializer.data)


# Create like on photo


class PhotoLikeCreate(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PhotoLikeSerializer

    def post(self, request, *args, **kwargs):
        # query photolike object from DB

        photo = Photo.objects.get(id=self.request.data['photo_id'])
        try:
            photo_like = PhotoLike.objects.get(user_id=self.request.data['user_id'],
                                               photo_id=self.request.data['photo_id'])
        except Exception as e:
            logger.info("Like has not been created")
            logger.info(e)
            photo_like = None
        if not photo_like:
            # if there is no photolike object with above condition => create one
            serializer = self.get_serializer(data=request.data)
            logger.debug(serializer)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            # add user to likes list
            photo.user_likes.add(self.request.data['user_id'])
            photo.save()

            return Response(serializer.data, status=status.HTTP_200_OK, headers=headers)

        elif True == photo_like.is_enabled:
            # if there is photolike object with above condition => disable it
            photo_like.is_enabled = False
            photo_like.save()
            # remove user to likes list
            photo.user_likes.remove(self.request.data['user_id'])
            photo.save()

            return Response({'info': 'you have unlike this photo!'}, status=status.HTTP_200_OK)
        else:
            # if there is photolike object with above condition => re-enable it
            photo_like.is_enabled = True
            photo_like.save()
            # add user to likes list
            photo.user_likes.add(self.request.data['user_id'])
            photo.save()
            return Response({'info': 'you have like this photo!'}, status=status.HTTP_200_OK)


# Create comment on photo


class PhotoCommentCreate(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PhotoCommentSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        parent = serializer.validated_data.get('parent')
        if parent is not None:
            try:
                parent_id = getattr(parent, 'cmt_id')
                logger.debug(parent)
                logger.debug(type(parent))
                existing_cmt = PhotoComment.objects.filter(cmt_id=parent_id)
                logger.debug(existing_cmt)
            except Exception as e:
                logger.error(e)
                logger.error("Parent Comment not found")
                return Response(status=status.HTTP_400_BAD_REQUEST, headers=headers)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_200_OK, headers=headers)

# Magazine


class MagazineList(generics.ListCreateAPIView):
    queryset = Magazine.objects.all()
    serializer_class = MagazineSerializer
    # filter_backends = (filters.DjangoFilterBackend,)
    # filter_class = magazineFilter

    def list(self, request, *args, **kwargs):
        # getting current user type
        user=self.request.user 

        category = request.GET.get('category', '')
        logger.debug(category)
        if not category:
            raise ValidationError
        # getting show/hide setting from Generic Config tbl
        config_obj = GenericConfig.objects.filter(in_use=True)
        try:
            show_activities = config_obj.values().first()["show_activities"]
            logger.debug("show_activities = {}".format(show_activities))
        except Exception as e:
            logger.error("Cannot get config\nException: {}".format(e))
            show_activities = True

        # if current user is admin => query all magazines from DB, if not only query "Publish" photos
        if user.is_superuser == True:
            queryset = Magazine.objects.filter(category__cat_name__iexact=category)
        else:
            queryset = Magazine.objects.filter(category__cat_name__iexact=category, status=1)

        # queryset = Magazine.objects.filter(category__cat_name__iexact=category)
        # queryset = queryset.order_by('-created_at')

        page = self.paginate_queryset(queryset)
        if page is not None:
            if show_activities:
                serializer = self.get_serializer(page, many=True,)
            else:
                serializer = self.get_serializer(
                    page, many=True, removed_fields=('activities',))
            return self.get_paginated_response(serializer.data)

        if show_activities:
            serializer = self.get_serializer(queryset, many=True)
        else:
            serializer = self.get_serializer(
                page, many=True, removed_fields=('activities',))

        return Response(serializer.data)


class MagazineDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Magazine.objects.all()
    serializer_class = MagazineDetailSerializer

    def get(self, request, *args, **kwargs):
        # getting current user type and magazine
        user=self.request.user
        instance = self.get_object()

        # if current user not is admin and current magazine status is "Draft" => raise error 
        if user.is_superuser == False and instance.status == 0:
            return Response({'error':'Only admin can access this magazine!'}, status=status.HTTP_400_BAD_REQUEST,)

        # view increment
        instance.view_count = instance.view_count + 1
        instance.save(update_fields=("view_count", ))

        # getting show/hide setting from Generic Config tbl
        config_obj = GenericConfig.objects.filter(in_use=True)
        try:
            show_activities = config_obj.values().first()["show_activities"]
            logger.debug("show_activities = {}".format(show_activities))
        except Exception as e:
            logger.error("Cannot get config\nException: {}".format(e))
            show_activities = True
        if show_activities:
            serializer = self.get_serializer(instance)
        else:
            serializer = self.get_serializer(
                instance, removed_fields=('likes', 'comments',))

        return Response(serializer.data)


class MagazineSearch(views.APIView, pagination.PageNumberPagination):

    def get(self, request):
        searched_tags = request.GET.get('search_text', '').split()
        logger.debug(searched_tags)

        queryset = Magazine.objects.filter(tags__name__in=searched_tags).distinct()
        queryset = queryset.order_by('-created_at')
        page = self.paginate_queryset(queryset, request, view=self)
        if page is not None:
            serializer = MagazineSerializer(queryset, many=True)
            return self.get_paginated_response(serializer.data)

        logger.debug(queryset)
        serializer = MagazineSerializer(queryset, many=True)
        return Response(serializer.data)


class MagazineLikeCreate(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = MagazineLikeSerializer

    def post(self, request, *args, **kwargs):
        # query photolike object from DB

        magazine = Magazine.objects.get(id=self.request.data['magazine_id'])
        try:
            magazine_like = MagazineLike.objects.get(user_id=self.request.data['user_id'],
                                             magazine_id=self.request.data['magazine_id'])
        except Exception as e:
            logger.info("Like has not been created")
            logger.info(e)
            magazine_like = None
        if not magazine_like:
            # if there is no MagazineLike object with above condition => create one
            serializer = self.get_serializer(data=request.data)
            logger.debug(serializer)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            # add user to likes list
            magazine.user_likes.add(self.request.data['user_id'])
            magazine.save()

            return Response(serializer.data, status=status.HTTP_200_OK, headers=headers)

        elif True == magazine_like.is_enabled:
            # if there is MagazineLike object with above condition => disable it
            magazine_like.is_enabled = False
            magazine_like.save()
            # remove user to likes list
            magazine.user_likes.remove(self.request.data['user_id'])
            magazine.save()

            return Response({'info': 'you have unlike this magazine!'}, status=status.HTTP_200_OK)
        else:
            # if there is MagazineLike object with above condition => re-enable it
            magazine_like.is_enabled = True
            magazine_like.save()
            # add user to likes list
            magazine.user_likes.add(self.request.data['user_id'])
            magazine.save()
            return Response({'info': 'you have like this magazine!'}, status=status.HTTP_200_OK)


class MagazineSuggest(CustomPaginate):
    def get(self, request):
        page = request.GET.get("page")
        magazine_id = request.GET.get('magazine_id')
        logger.debug(magazine_id)

        # # getting interactive ratio from Generic Config tbl
        # config_obj = GenericConfig.objects.filter(in_use=True)
        # interactive_ratio = config_obj.values().first()
        # logger.debug("interactive_ratio = {}".format(interactive_ratio))
        # if not interactive_ratio:
        #     logger.error("Config not found")
        #     return Response(status=status.HTTP_400_BAD_REQUEST,)

        try:
            org_queryset = Magazine.objects.filter(id=magazine_id).distinct()
            org_serializer = MagazineDetailSerializer(org_queryset, many=True)
            # logger.debug(
            #     ("org_queryset data = {}".format(org_serializer.data[0])))

            # get tags list, filter and sort magazine having matched tags
            org_tag_list = org_serializer.data[0]["tags"]
            org_author = org_serializer.data[0]["author"]
            logger.debug(("tag_list = {}".format(org_tag_list)))
            clauses = ((Q(tags__name__iexact=tag) for tag in org_tag_list))
            query = reduce(operator.or_, clauses)
            similar_magazine_queryset = Magazine.objects.filter(
                query | Q(author=org_author)).distinct()

            # similar_magazine_queryset = Magazine.objects.filter(tags__name__in=org_tag_list).distinct()
            # similar_magazine_queryset = Magazine.objects.filter(Q(tags__icontains='candy')|Q(body__icontains='candy'))

            similar_magazine_queryset = similar_magazine_queryset.exclude(
                id=magazine_id)
            similar_magazine_serializer = MagazineSerializer(
                similar_magazine_queryset, many=True)
            # logger.debug(("similar_magazine_serializer data = {}".format(
            # similar_magazine_serializer.data)))

            for magazine in similar_magazine_serializer.data:
                magazine['interactive_pt'] = calc_interactive_pt(
                    org_tag_list, magazine['tags'], org_author, magazine['author'])

            sorted_suggestion_list = sorted(
                similar_magazine_serializer.data, key=lambda k: (-k['interactive_pt']))
            # logger.debug(("ranking list = {}".format(sorted_suggestion_list)))

            similar_magazine_serializer = MagazineSuggestSerializer(
                similar_magazine_queryset, many=True, context={'org_tag_list': org_tag_list, 'org_author ': org_author})

            return Response(self.paginate(sorted_suggestion_list, page, 6))

            # page = self.paginate_queryset(
            #     similar_magazine_queryset, request, view=self)
            # if page is not None:
            #     logger.debug("page = {}".format(page))
            #     similar_magazine_serializer = MagazineSuggestSerializer(
            #     page, many=True, context={'org_tag_list': org_tag_list, 'org_author': org_author})
            #     # sorted_suggestion_list = sorted(
            #     # similar_magazine_serializer.data, key=lambda k: (-k['interactive_pt']))
            #     return self.get_paginated_response(similar_magazine_serializer.data)

            # return Response(sorted_suggestion_list)

        except IndexError as e:
            logger.error("Cannot get suggestion")
            logger.error("Exception = {}".format(e))
            logger.error("Request: {}".format(request.GET.dict()))
            return Response(status=status.HTTP_400_BAD_REQUEST,)

        # Food.objects.filter(tags__name__in=["delicious"])
        # queryset = Magazine.objects.filter(tags__name__in=searched_tags).distinct()
        # queryset = queryset.order_by('-created_at')
        # # page = pagination.PageNumberPagination.paginate_queryset(queryset=queryset, request=request)
        # page = self.paginate_queryset(queryset, request, view=self)
        # if page is not None:
        #     serializer = MagazineSerializer(queryset, many=True)
        #     return self.get_paginated_response(serializer.data)

        # logger.debug(queryset)
        # serializer = MagazineSerializer(queryset, many=True)
        # return Response(status=status.HTTP_200_OK,)

# Get the most trending magazine


class MagazineFeatureDetail(views.APIView):
    # queryset = MagazineFeature.objects.all()
    # serializer_class = MagazineFeatureSerializer

    def get(self, request, *args, **kwargs):
        category = request.GET.get('category', '')
        logger.debug(category)
        if not category:
            raise ValidationError

        queryset = MagazineFeature.objects.filter(category__cat_name__iexact=category)
        if queryset.count() == 0:
            logger.error("Feature magazine does not exist")
            return Response("Feature magazine does not exist", status=status.HTTP_400_BAD_REQUEST)
        serializer = MagazineFeatureSerializer(queryset, many=True)
        return Response(serializer.data)

# Create comment on photo


class MagazineCommentCreate(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = MagazineCommentSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        parent = serializer.validated_data.get('parent')
        if parent is not None:
            try:
                parent_id = getattr(parent, 'cmt_id')
                logger.debug(parent)
                logger.debug(type(parent))
                existing_cmt = MagazineComment.objects.filter(cmt_id=parent_id)
                logger.debug(existing_cmt)
            except Exception as e:
                logger.error(e)
                logger.error("Parent Comment not found")
                return Response(status=status.HTTP_400_BAD_REQUEST, headers=headers)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_200_OK, headers=headers)


class MagazineCategoryList(generics.ListCreateAPIView):
    queryset = MagazineCategory.objects.all()
    serializer_class = MagazineCategorySerializer

class MagazineSubCategoryList(generics.ListCreateAPIView):
    queryset = MagazineSubCategory.objects.all()
    serializer_class = MagazineSubCategorySerializer