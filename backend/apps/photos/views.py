from django.shortcuts import render
from django.http import Http404

from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import views, status, mixins, generics, pagination
import logging

from .models import Photo, News, PhotoLike, PhotoComment, PhotoDislike, PhotoLike, PhotoComment, PhotoDislike
from .serializers import PhotoSerializer, PhotoDetailSerializer, CommentSerializer, NewsSerializer

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

class PhotoList(generics.ListCreateAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    # filter_backends = (filters.DjangoFilterBackend,)
    # filter_class = PhotoFilter

    def list(self, request, *args, **kwargs):
        queryset = Photo.objects.all()
        # queryset = queryset.order_by('-created_at')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
            
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class PhotoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoDetailSerializer

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        
        instance.view_count = instance.view_count + 1
        instance.save(update_fields=("view_count", ))

        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class PhotoSearch(views.APIView, pagination.PageNumberPagination):

    def get(self, request):
        searched_tags = request.GET.get('search_text','').split()
        logger.debug(searched_tags)
        
        # Food.objects.filter(tags__name__in=["delicious"])
        queryset = Photo.objects.filter(tags__name__in=searched_tags).distinct()
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
        searched_tags = request.GET.get('photo_id','').split()
        logger.debug(searched_tags)
        
        # Food.objects.filter(tags__name__in=["delicious"])
        queryset = Photo.objects.filter(tags__name__in=searched_tags).distinct()
        queryset = queryset.order_by('-created_at')
        # page = pagination.PageNumberPagination.paginate_queryset(queryset=queryset, request=request)
        page = self.paginate_queryset(queryset, request, view=self)
        if page is not None:
            serializer = PhotoSerializer(queryset, many=True)
            return self.get_paginated_response(serializer.data)
            
        logger.debug(queryset)
        serializer = PhotoSerializer(queryset, many=True)
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
        searched_tags = request.GET.get('search_text','').split()
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