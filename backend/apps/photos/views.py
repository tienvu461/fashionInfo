from django.shortcuts import render
from django.http import Http404
from django.db.models import Q

from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import serializers, views, status, mixins, generics, pagination
import logging

from .models import GenericConfig, Photo, News, PhotoLike, PhotoComment, PhotoLike, PhotoComment, PhotoFeature
from .serializers import PhotoSerializer, PhotoDetailSerializer, PhotoFeatureSerializer, CommentSerializer, NewsSerializer
from .consts import photosConst
from .utils import calc_interactive_pt

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

        # Food.objects.filter(tags__name__in=["delicious"])
        queryset = Photo.objects.filter(
            tags__name__in=searched_tags).distinct()
        queryset = queryset.order_by('-created_at')
        # page = pagination.PageNumberPagination.paginate_queryset(queryset=queryset, request=request)
        page = self.paginate_queryset(queryset, request, view=self)
        if page is not None:
            serializer = PhotoSerializer(queryset, many=True)
            return self.get_paginated_response(serializer.data)

        logger.debug(queryset)
        serializer = PhotoSerializer(queryset, many=True)
        return Response(serializer.data)


class PhotoSuggest(views.APIView, pagination.PageNumberPagination):

    def get(self, request):
        photo_id = request.GET.get('photo_id')
        logger.debug(photo_id)
        test_param = {
            'like': 8,
            'dislike': 3,
            'comment': 10,
            'view': 10
        }

        # getting interactive ratio from Generic Config tbl
        config_obj = GenericConfig.objects.filter(in_use=True)
        interactive_ratio = config_obj.values().first()
        logger.debug("interactive_ratio = {}".format(interactive_ratio))
        if not interactive_ratio:
            logger.error("Config not found")
            return Response(status=status.HTTP_400_BAD_REQUEST,)

        try:
            org_queryset = Photo.objects.filter(id=photo_id).distinct()
            org_serializer = PhotoDetailSerializer(org_queryset, many=True)
            logger.debug(
                ("org_queryset data = {}".format(org_serializer.data[0])))

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
            logger.debug(("similar_photos_serializer data = {}".format(
                similar_photos_serializer.data)))

            for photo in similar_photos_serializer.data:
                photo['interactive_pt'] = calc_interactive_pt(
                    org_tag_list, photo['tags'], org_photographer, photo['photographer'])

            sorted_suggestion_list = sorted(
                similar_photos_serializer.data, key=lambda k: (-k['interactive_pt']))
            logger.debug(type(similar_photos_serializer.data))
            logger.debug(("ranking list = {}".format(sorted_suggestion_list)))
            page = self.paginate_queryset(
                similar_photos_queryset, request, view=self)
            if page is not None:
                return self.get_paginated_response(sorted_suggestion_list)

            return Response(sorted_suggestion_list)

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
        return Response(status=status.HTTP_200_OK,)

# Get the most trending photo


class PhotoFeatureDetail(views.APIView):
    # queryset = PhotoFeature.objects.all()
    # serializer_class = PhotoFeatureSerializer

    def get(self, request, *args, **kwargs):
        queryset = PhotoFeature.objects.filter(in_use=True)
        if queryset.count() == 0:
            return Response("Feature photos does not exist", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        serializer = PhotoFeatureSerializer(queryset, many=True)
        return Response(serializer.data)

# Create comment on photo


class PhotoCommentCreate(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CommentSerializer

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


class NewsList(generics.ListCreateAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    # filter_backends = (filters.DjangoFilterBackend,)
    # filter_class = NewsFilter

    def list(self, request, *args, **kwargs):
        queryset = News.objects.all()
        # queryset = queryset.order_by('-created_at')

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class NewsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer


class NewsSearch(views.APIView, pagination.PageNumberPagination):

    def get(self, request):
        searched_tags = request.GET.get('search_text', '').split()
        logger.debug(searched_tags)

        # Food.objects.filter(tags__name__in=["delicious"])
        queryset = News.objects.filter(tags__name__in=searched_tags).distinct()
        queryset = queryset.order_by('-created_at')
        # page = pagination.PageNumberPagination.paginate_queryset(queryset=queryset, request=request)
        page = self.paginate_queryset(queryset, request, view=self)
        if page is not None:
            serializer = NewsSerializer(queryset, many=True)
            return self.get_paginated_response(serializer.data)

        logger.debug(queryset)
        serializer = NewsSerializer(queryset, many=True)
        return Response(serializer.data)
