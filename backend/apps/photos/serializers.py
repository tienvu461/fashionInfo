from django.contrib.sites.models import Site
from rest_framework import serializers
from django.http import HttpRequest as request
from django.http import HttpResponse
from taggit_serializer.serializers import (TagListSerializerField,
                                           TaggitSerializer)
from django.conf import settings

import logging
import json

from .models import Photo, News, PhotoFeature, PhotoLike, PhotoComment, GenericConfig
from .consts import modelConst, postTypeEnum
logger = logging.getLogger('photos')


class PhotoSerializer(serializers.ModelSerializer):
    activities = serializers.SerializerMethodField()
    tags = TagListSerializerField()

    class Meta:
        model = Photo
        fields = ['id', 'title', 'author', 'image_path',
                  'status', 'created_at', 'activities', 'tags', 'photographer']
        removed_fields = []

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        removed_fields = kwargs.pop('removed_fields', None)

        # Instantiate the superclass normally
        super(PhotoSerializer, self).__init__(*args, **kwargs)

        if removed_fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            removed = set(removed_fields)
            existing = set(self.fields)
            for field_name in removed:
                self.fields.pop(field_name)

    def to_representation(self, instance):
        data_fields = super(PhotoSerializer, self).to_representation(instance)
        data_fields['created_at'] = int(instance.created_at.timestamp())
        # data_fields['image_path'] = instance.image_path.remove()

        return data_fields

    def get_activities(self, instance):
        like_num = PhotoLike.objects.filter(photo_id=instance.id).count()
        comment_num = PhotoComment.objects.filter(photo_id=instance.id).count()
        view_count = getattr(instance, 'view_count')

        return {
            'likes': like_num,
            'comments': comment_num,
            'views': view_count,
        }

    # def get_likes(self, instance):
    #     return Like.objects.filter(post_id=instance.id).count()

    # def get_dislikes(self, instance):
    #     return Dislike.objects.filter(post_id=instance.id).count()

    # def get_comments(self, instance):
    #     return Comments.objects.filter(post_id=instance.id).count()

# detail of photo


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhotoComment
        fields = ['cmt_id', 'user_id', 'photo_id', 'content', 'active', 'parent',
                  'created_at']

    def to_representation(self, instance):
        data_fields = super(CommentSerializer,
                            self).to_representation(instance)
        data_fields['created_at'] = int(instance.created_at.timestamp())

        return data_fields


class PhotoDetailSerializer(PhotoSerializer):
    likes = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    detail_info = serializers.SerializerMethodField()

    class Meta:
        model = Photo
        fields = ['id', 'title', 'author', 'image_path', 'status', 'detail_info',
                  'created_at', 'likes', 'comments', 'tags', 'view_count']
        removed_fields = []

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        removed_fields = kwargs.pop('removed_fields', None)

        # Instantiate the superclass normally
        super(PhotoSerializer, self).__init__(*args, **kwargs)

        if removed_fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            removed = set(removed_fields)
            existing = set(self.fields)
            for field_name in removed:
                self.fields.pop(field_name)

    def get_detail_info(self, instance):
        model_name = getattr(instance, 'model_name')
        model_job = getattr(instance, 'model_job')
        try:
            shoot_date = int(getattr(instance, 'shoot_date').timestamp())
        except:
            shoot_date = "N/A"
        location = getattr(instance, 'location')
        brand = getattr(instance, 'brand')
        photographer = getattr(instance, 'photographer')
        post_date = int(getattr(instance, 'post_date').timestamp())

        return {
            'model_name': model_name,
            'model_job': model_job,
            'shoot_date': shoot_date,
            'location': location,
            'brand': brand,
            'photographer': photographer,
            'post_date': post_date,
        }

    def get_likes(self, instance):
        return PhotoLike.objects.filter(photo_id=instance.id).count()

    def get_comments(self, instance):
        comment_queryset = PhotoComment.objects.filter(photo_id=instance.id)

        # data = serializers.serialize('json', query)
        return CommentSerializer(comment_queryset, many=True).data


class PhotoFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhotoFeature
        fields = ['id', 'feature_photo', 'login_photo', 'signup_photo',
                  'popup_photo', 'subscribe_photo', 'in_use', 'created_at']

    def to_representation(self, instance):
        data_fields = super(PhotoFeatureSerializer, self).to_representation(instance)
        queryset = Photo.objects.values_list('image_path', flat=True)
        data_fields['feature_photo'] = settings.MEDIA_URL + queryset.get(id=data_fields['feature_photo'])
        data_fields['login_photo'] = settings.MEDIA_URL + queryset.get(id=data_fields['login_photo'])
        data_fields['signup_photo'] = settings.MEDIA_URL + queryset.get(id=data_fields['signup_photo'])
        data_fields['popup_photo'] = settings.MEDIA_URL + queryset.get(id=data_fields['popup_photo'])
        data_fields['subscribe_photo'] = settings.MEDIA_URL + queryset.get(id=data_fields['subscribe_photo'])
        data_fields['created_at'] = int(instance.created_at.timestamp())

        return data_fields


class NewsSerializer(serializers.ModelSerializer):
    activities = serializers.SerializerMethodField()
    tags = TagListSerializerField()

    class Meta:
        model = News
        fields = ['id', 'title', 'author', 'formatted_markdown',
                  'status', 'created_at', 'activities', 'tags']

    def to_representation(self, instance):
        data_fields = super(NewsSerializer, self).to_representation(instance)
        data_fields['created_at'] = int(instance.created_at.timestamp())

        return data_fields

    def get_activities(self, instance):
        like_num = NewsLike.objects.filter(post_id=instance.id).count()
        dislike_num = NewsDislike.objects.filter(post_id=instance.id).count()
        comment_num = NewsComment.objects.filter(post_id=instance.id).count()

        return {'likes': like_num,
                'dislikes': dislike_num,
                'comments': comment_num
                }


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ['id', 'title', 'author',
                  'formatted_markdown', 'status', 'created_at']

    def to_representation(self, instance):
        data_fields = super(NewsSerializer, self).to_representation(instance)
        data_fields['created_at'] = int(instance.created_at.timestamp())

        return data_fields
