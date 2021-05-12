from django.contrib.sites.models import Site
from rest_framework import serializers
from django.http import HttpRequest as request
from django.http import HttpResponse
from taggit_serializer.serializers import (TagListSerializerField,
                                           TaggitSerializer)
import logging
import json

from .models import Photo, News, PhotoLike, PhotoDislike, PhotoComment
from .consts import modelConst, postTypeEnum
logger = logging.getLogger('photos')


class PhotoSerializer(serializers.ModelSerializer):
    activities = serializers.SerializerMethodField()
    tags = TagListSerializerField()

    class Meta:
        model = Photo
        fields = ['id', 'title', 'author', 'image_path',
            'status', 'created_at', 'activities', 'tags']

    def to_representation(self, instance):
        data_fields = super(PhotoSerializer, self).to_representation(instance)
        data_fields['created_at'] = int(instance.created_at.timestamp())
        # data_fields['image_path'] = instance.image_path.remove()

        return data_fields

    def get_activities(self, instance):
        like_num = PhotoLike.objects.filter(photo_id=instance.id).count()
        dislike_num = PhotoDislike.objects.filter(photo_id=instance.id).count()
        comment_num = PhotoComment.objects.filter(photo_id=instance.id).count()

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

# detail of photo

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhotoComment
        fields = ['cmt_id', 'user_id', 'photo_id', 'content', 'active', 'parent',
            'created_at']

    def to_representation(self, instance):
        data_fields = super(CommentSerializer, self).to_representation(instance)
        data_fields['created_at'] = int(instance.created_at.timestamp())

        return data_fields

class PhotoDetailSerializer(PhotoSerializer):
    likes = serializers.SerializerMethodField()
    dislikes = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Photo
        fields = ['id', 'title', 'author', 'image_path', 'status',
            'created_at', 'likes', 'dislikes', 'comments', 'tags', 'view_count']

    # def get_activities(self, instance):
    #     like_num = PhotoLike.objects.filter(photo_id=instance.id).count()
    #     dislike_num = PhotoDislike.objects.filter(photo_id=instance.id).count()
    #     comment_num = PhotoComment.objects.filter(photo_id=instance.id).count()

    #     return {'likes': like_num,
    #             'dislikes': dislike_num,
    #             'comments': comment_num
    #             }

    def get_likes(self, instance):
        return PhotoLike.objects.filter(photo_id=instance.id).count()

    def get_dislikes(self, instance):
        return PhotoDislike.objects.filter(photo_id=instance.id).count()

    def get_comments(self, instance):
        from django.forms.models import model_to_dict

        comment_queryset = PhotoComment.objects.filter(photo_id=instance.id)

        # data = serializers.serialize('json', query)
        return  CommentSerializer(comment_queryset, many=True).data

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
