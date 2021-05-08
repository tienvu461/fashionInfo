from django.shortcuts import render
from django.http import Http404

from rest_framework.response import Response
from rest_framework import views, status, mixins, generics, pagination
import logging

from .models import Photo, News, Like, Comment
from .serializers import PhotoSerializer, NewsSerializer

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
    serializer_class = PhotoSerializer

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