from django.shortcuts import render
from django.http import Http404
from django.db.models import Q

from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import serializers, views, status, mixins, generics, pagination
import logging

from .models import Photo, PhotoLike, PhotoFeature, PhotoComment, GenericConfig
from .serializers import PhotoSerializer, PhotoDetailSerializer, PhotoFeatureSerializer, PhotoSuggestSerializer, PhotoCommentSerializer, PhotoLikeSerializer
from .models import News, NewsLike, NewsFeature, NewsComment, NewsCategory, NewsSubCategory
from .serializers import NewsSerializer, NewsDetailSerializer, NewsFeatureSerializer, NewsSuggestSerializer, NewsCommentSerializer, NewsLikeSerializer, NewsCategorySerializer, NewsSubCategorySerializer
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
        # getting show/hide setting from Generic Config tbl
        config_obj = GenericConfig.objects.filter(in_use=True)
        try:
            show_activities = config_obj.values().first()["show_activities"]
            logger.debug("show_activities = {}".format(show_activities))
        except Exception as e:
            logger.error("Cannot get config\nException: {}".format(e))
            show_activities = True

        queryset = Photo.objects.all()
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
        # view increment
        instance = self.get_object()
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
            import operator
            from functools import reduce

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

# News


class NewsList(generics.ListCreateAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    # filter_backends = (filters.DjangoFilterBackend,)
    # filter_class = NewsFilter

    def list(self, request, *args, **kwargs):
        category = request.GET.get('category', '')
        logger.debug(category)
        # getting show/hide setting from Generic Config tbl
        config_obj = GenericConfig.objects.filter(in_use=True)
        try:
            show_activities = config_obj.values().first()["show_activities"]
            logger.debug("show_activities = {}".format(show_activities))
        except Exception as e:
            logger.error("Cannot get config\nException: {}".format(e))
            show_activities = True

        queryset = News.objects.filter(category__cat_name__iexact=category)
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


class NewsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = News.objects.all()
    serializer_class = NewsDetailSerializer

    def get(self, request, *args, **kwargs):
        # view increment
        instance = self.get_object()
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


class NewsSearch(views.APIView, pagination.PageNumberPagination):

    def get(self, request):
        searched_tags = request.GET.get('search_text', '').split()
        logger.debug(searched_tags)

        queryset = News.objects.filter(tags__name__in=searched_tags).distinct()
        queryset = queryset.order_by('-created_at')
        page = self.paginate_queryset(queryset, request, view=self)
        if page is not None:
            serializer = NewsSerializer(queryset, many=True)
            return self.get_paginated_response(serializer.data)

        logger.debug(queryset)
        serializer = NewsSerializer(queryset, many=True)
        return Response(serializer.data)


class NewsLikeCreate(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = NewsLikeSerializer

    def post(self, request, *args, **kwargs):
        # query photolike object from DB

        news = News.objects.get(id=self.request.data['news_id'])
        try:
            news_like = NewsLike.objects.get(user_id=self.request.data['user_id'],
                                             news_id=self.request.data['news_id'])
        except Exception as e:
            logger.info("Like has not been created")
            logger.info(e)
            news_like = None
        if not news_like:
            # if there is no newslike object with above condition => create one
            serializer = self.get_serializer(data=request.data)
            logger.debug(serializer)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            # add user to likes list
            news.user_likes.add(self.request.data['user_id'])
            news.save()

            return Response(serializer.data, status=status.HTTP_200_OK, headers=headers)

        elif True == news_like.is_enabled:
            # if there is newslike object with above condition => disable it
            news_like.is_enabled = False
            news_like.save()
            # remove user to likes list
            news.user_likes.remove(self.request.data['user_id'])
            news.save()

            return Response({'info': 'you have unlike this news!'}, status=status.HTTP_200_OK)
        else:
            # if there is newslike object with above condition => re-enable it
            news_like.is_enabled = True
            news_like.save()
            # add user to likes list
            news.user_likes.add(self.request.data['user_id'])
            news.save()
            return Response({'info': 'you have like this news!'}, status=status.HTTP_200_OK)


class NewsSuggest(CustomPaginate):
    def get(self, request):
        page = request.GET.get("page")
        news_id = request.GET.get('news_id')
        logger.debug(news_id)

        # # getting interactive ratio from Generic Config tbl
        # config_obj = GenericConfig.objects.filter(in_use=True)
        # interactive_ratio = config_obj.values().first()
        # logger.debug("interactive_ratio = {}".format(interactive_ratio))
        # if not interactive_ratio:
        #     logger.error("Config not found")
        #     return Response(status=status.HTTP_400_BAD_REQUEST,)

        try:
            org_queryset = News.objects.filter(id=news_id).distinct()
            org_serializer = NewsDetailSerializer(org_queryset, many=True)
            # logger.debug(
            #     ("org_queryset data = {}".format(org_serializer.data[0])))

            # get tags list, filter and sort news having matched tags
            org_tag_list = org_serializer.data[0]["tags"]
            org_author = org_serializer.data[0]["author"]
            logger.debug(("tag_list = {}".format(org_tag_list)))
            import operator
            from functools import reduce

            clauses = ((Q(tags__name__iexact=tag) for tag in org_tag_list))
            query = reduce(operator.or_, clauses)
            similar_news_queryset = News.objects.filter(
                query | Q(author=org_author)).distinct()

            # similar_news_queryset = News.objects.filter(tags__name__in=org_tag_list).distinct()
            # similar_news_queryset = News.objects.filter(Q(tags__icontains='candy')|Q(body__icontains='candy'))

            similar_news_queryset = similar_news_queryset.exclude(
                id=news_id)
            similar_news_serializer = NewsSerializer(
                similar_news_queryset, many=True)
            # logger.debug(("similar_news_serializer data = {}".format(
            # similar_news_serializer.data)))

            for news in similar_news_serializer.data:
                news['interactive_pt'] = calc_interactive_pt(
                    org_tag_list, news['tags'], org_author, news['author'])

            sorted_suggestion_list = sorted(
                similar_news_serializer.data, key=lambda k: (-k['interactive_pt']))
            # logger.debug(("ranking list = {}".format(sorted_suggestion_list)))

            similar_news_serializer = NewsSuggestSerializer(
                similar_news_queryset, many=True, context={'org_tag_list': org_tag_list, 'org_author ': org_author})

            return Response(self.paginate(sorted_suggestion_list, page, 6))

            # page = self.paginate_queryset(
            #     similar_news_queryset, request, view=self)
            # if page is not None:
            #     logger.debug("page = {}".format(page))
            #     similar_news_serializer = NewsSuggestSerializer(
            #     page, many=True, context={'org_tag_list': org_tag_list, 'org_author': org_author})
            #     # sorted_suggestion_list = sorted(
            #     # similar_news_serializer.data, key=lambda k: (-k['interactive_pt']))
            #     return self.get_paginated_response(similar_news_serializer.data)

            # return Response(sorted_suggestion_list)

        except IndexError as e:
            logger.error("Cannot get suggestion")
            logger.error("Exception = {}".format(e))
            logger.error("Request: {}".format(request.GET.dict()))
            return Response(status=status.HTTP_400_BAD_REQUEST,)

        # Food.objects.filter(tags__name__in=["delicious"])
        # queryset = News.objects.filter(tags__name__in=searched_tags).distinct()
        # queryset = queryset.order_by('-created_at')
        # # page = pagination.PageNumberPagination.paginate_queryset(queryset=queryset, request=request)
        # page = self.paginate_queryset(queryset, request, view=self)
        # if page is not None:
        #     serializer = NewsSerializer(queryset, many=True)
        #     return self.get_paginated_response(serializer.data)

        # logger.debug(queryset)
        # serializer = NewsSerializer(queryset, many=True)
        # return Response(status=status.HTTP_200_OK,)

# Get the most trending news


class NewsFeatureDetail(views.APIView):
    # queryset = NewsFeature.objects.all()
    # serializer_class = NewsFeatureSerializer

    def get(self, request, *args, **kwargs):
        queryset = NewsFeature.objects.filter(in_use=True)
        if queryset.count() == 0:
            logger.error("Feature news does not exist")
            return Response("Feature news does not exist", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        serializer = NewsFeatureSerializer(queryset, many=True)
        return Response(serializer.data)

# Create comment on photo


class NewsCommentCreate(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = NewsCommentSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        parent = serializer.validated_data.get('parent')
        if parent is not None:
            try:
                parent_id = getattr(parent, 'cmt_id')
                logger.debug(parent)
                logger.debug(type(parent))
                existing_cmt = NewsComment.objects.filter(cmt_id=parent_id)
                logger.debug(existing_cmt)
            except Exception as e:
                logger.error(e)
                logger.error("Parent Comment not found")
                return Response(status=status.HTTP_400_BAD_REQUEST, headers=headers)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_200_OK, headers=headers)


class NewsCategoryList(generics.ListCreateAPIView):
    queryset = NewsCategory.objects.all()
    serializer_class = NewsCategorySerializer

class NewsSubCategoryList(generics.ListCreateAPIView):
    queryset = NewsSubCategory.objects.all()
    serializer_class = NewsSubCategorySerializer