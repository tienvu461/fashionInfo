from django.contrib.sites.models import Site
from rest_framework import serializers
from django.http import HttpRequest as request

import logging

from .models import Photo, News, Like, Dislike, Comment
from .consts import modelConst, postTypeEnum
logger = logging.getLogger('photos')

class PhotoSerializer(serializers.ModelSerializer):
    activities = serializers.SerializerMethodField()
    class Meta:
        model = Photo
        fields = ['id', 'title', 'author', 'image_path', 'status', 'created_at', 'activities']

    def to_representation(self, instance):
        data_fields = super(PhotoSerializer, self).to_representation(instance)
        data_fields['created_at'] = int(instance.created_at.timestamp())
        # data_fields['image_path'] = instance.image_path.remove()
        

        return data_fields

    def get_activities(self, instance):
        like_num = Like.objects.filter(post_id=instance.id, post_type=postTypeEnum.Photo.value).count()
        dislike_num = Dislike.objects.filter(post_id=instance.id, post_type=postTypeEnum.Photo.value).count()
        comment_num =  Comment.objects.filter(post_id=instance.id, post_type=postTypeEnum.Photo.value).count()

        return {'likes': like_num,
                'dislikes': dislike_num,
                'comments': comment_num
        }

    # def get_likes(self, instance):
    #     return Like.objects.filter(post_id=instance.id).count()

    # def get_dislikes(self, instance):
    #     return Dislike.objects.filter(post_id=instance.id).count()

    # def get_comments(self, instance):
    #     return Comments.objects.filter(post_id=instance.id).count()

class NewsSerializer(serializers.ModelSerializer):
    activities = serializers.SerializerMethodField()
    class Meta:
        model = News
        fields = ['id', 'title', 'author', 'formatted_markdown', 'status', 'created_at', 'activities']

    def to_representation(self, instance):
        data_fields = super(NewsSerializer, self).to_representation(instance)
        data_fields['created_at'] = int(instance.created_at.timestamp())

        return data_fields
        
    def get_activities(self, instance):
        like_num = Like.objects.filter(post_id=instance.id, post_type=postTypeEnum.News.value).count()
        dislike_num = Dislike.objects.filter(post_id=instance.id, post_type=postTypeEnum.News.value).count()
        comment_num =  Comment.objects.filter(post_id=instance.id, post_type=postTypeEnum.News.value).count()

        return {'likes': like_num,
                'dislikes': dislike_num,
                'comments': comment_num
        }

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ['id', 'title', 'author', 'formatted_markdown', 'status', 'created_at']

    def to_representation(self, instance):
        data_fields = super(NewsSerializer, self).to_representation(instance)
        data_fields['created_at'] = int(instance.created_at.timestamp())

        return data_fields
        
