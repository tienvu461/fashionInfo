from django.shortcuts import render
from .models import Photo
from .serializers import PhotoSerializer
import logging
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import mixins
from rest_framework import generics

# Create your views here.

logger = logging.getLogger('photos')

class PhotoList(mixins.ListModelMixin,
                mixins.CreateModelMixin,
                generics.GenericAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer

    def get(self, request, *args, **kwargs):
        logger.debug(request)
        logger.info(request)
        logger.warn(request)
        logger.error(request)
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
