from django.contrib.auth.models import User
from django.contrib.sites.models import Site
from rest_framework import serializers
from django.http import HttpRequest as request
from django.http import HttpResponse
from taggit_serializer.serializers import (TagListSerializerField,
                                           TaggitSerializer)
from django.conf import settings

import logging
import json

from .models import Photo, PhotoFeature, PhotoLike, PhotoComment, GenericConfig
from .models import Magazine,MagazineComment, MagazineLike, MagazineCategory, MagazineSubCategory, MagazineFeature
from apps.accounts.models import UserProfile
from .consts import modelConst, postTypeEnum
from .utils import calc_interactive_pt, nested_comment
logger = logging.getLogger('photos')


class PhotoSerializer(serializers.ModelSerializer):
    activities = serializers.SerializerMethodField()
    tags = TagListSerializerField()

    class Meta:
        model = Photo
        fields = ['id', 'title', 'image_path', 'user_likes',
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
        like_num = PhotoLike.objects.filter(
            photo_id=instance.id, is_enabled=True).count()
        comment_num = PhotoComment.objects.filter(
            photo_id=instance.id, active=True).count()
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


class PhotoCommentSerializer(serializers.ModelSerializer):
    user_photo = serializers.SerializerMethodField()
    user_fullname = serializers.SerializerMethodField()

    class Meta:
        model = PhotoComment
        fields = ['cmt_id', 'user_id', 'user_fullname', 'user_photo', 'photo_id', 'content', 'active', 'parent',
                  'created_at']

    # take the current photo comment object from DB, which is a list => append a new comment to that list
    def to_representation(self, instance):
        data_fields = super(PhotoCommentSerializer,
                            self).to_representation(instance)
        data_fields['created_at'] = int(instance.created_at.timestamp())
        # data_fields['user_id'] = instance.user_id.first_name + ' ' + instance.user_id.last_name

        return data_fields

    def get_user_fullname(self, instance):
        return instance.user_id.get_full_name()

    def get_user_photo(self, instance):
        user_id = getattr(instance, 'user_id')
        user_photo = UserProfile.objects.get(user=user_id)
        return getattr(user_photo, "profile_photo").url


class PhotoLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhotoLike
        fields = ['like_id', 'user_id', 'photo_id', 'created_at']

    def to_representation(self, instance):
        data_fields = super(PhotoLikeSerializer,
                            self).to_representation(instance)
        data_fields['created_at'] = int(instance.created_at.timestamp())

        return data_fields


class PhotoDetailSerializer(PhotoSerializer):
    likes = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    detail_info = serializers.SerializerMethodField()

    class Meta:
        model = Photo
        fields = ['id', 'title', 'image_path', 'status', 'detail_info',
                  'created_at', 'likes', 'comments', 'user_likes', 'tags', 'view_count']
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
        style = getattr(instance, 'style')
        photographer = getattr(instance, 'photographer')
        social_url = getattr(instance, 'social_url')
        post_date = int(getattr(instance, 'post_date').timestamp())

        return {
            'model_name': model_name,
            'model_job': model_job,
            'shoot_date': shoot_date,
            'location': location,
            'brand': brand,
            'style': style,
            'photographer': photographer,
            'social_url': social_url,
            'post_date': post_date,
        }

    def get_likes(self, instance):
        return PhotoLike.objects.filter(photo_id=instance.id, is_enabled=True).count()

    def get_comments(self, instance):
        comment_queryset = PhotoComment.objects.filter(
            photo_id=instance.id, parent__isnull=True)
        reply_queryset = PhotoComment.objects.filter(
            photo_id=instance.id, parent__isnull=False)

        # data = serializers.serialize('json', query)
        comment_data = PhotoCommentSerializer(comment_queryset, many=True).data
        reply_data = PhotoCommentSerializer(reply_queryset, many=True).data
        nested_comment(comment_data, reply_data)
        return comment_data


class PhotoSuggestSerializer(PhotoSerializer):
    interactive_pt = serializers.SerializerMethodField()

    class Meta:
        model = Photo
        fields = ['id', 'title', 'author', 'image_path',
                  'status', 'created_at', 'activities', 'tags', 'photographer', 'interactive_pt']

    def get_interactive_pt(self, instance):
        org_tag_list = self.context.get("org_tag_list")
        org_photographer = self.context.get("org_photographer")
        tags_list = list(getattr(instance, 'tags').names())
        photographer = getattr(instance, 'photographer')

        logger.debug((tags_list))
        logger.debug(photographer)

        interactive_pt = calc_interactive_pt(
            org_tag_list, tags_list, org_photographer, photographer)
        return interactive_pt


class PhotoFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhotoFeature
        fields = ['id', 'feature_photo', 'login_photo', 'signup_photo',
                  'popup_photo', 'subscribe_photo', 'in_use', 'created_at']

    def to_representation(self, instance):
        data_fields = super(PhotoFeatureSerializer,
                            self).to_representation(instance)
        queryset = Photo.objects.values_list('image_path', flat=True)
        data_fields['feature_photo'] = {
            "photo_id": data_fields['feature_photo'],
            "image_path": settings.MEDIA_URL + queryset.get(id=data_fields['feature_photo'])
            }
        data_fields['login_photo'] = {
            "photo_id": data_fields['login_photo'],
            "image_path": settings.MEDIA_URL + queryset.get(id=data_fields['login_photo'])
            }
        data_fields['signup_photo'] = {
            "photo_id": data_fields['signup_photo'],
            "image_path": settings.MEDIA_URL + queryset.get(id=data_fields['signup_photo'])
            }
        data_fields['popup_photo'] = {
            "photo_id": data_fields['popup_photo'],
            "image_path": settings.MEDIA_URL + queryset.get(id=data_fields['popup_photo'])
            }
        data_fields['subscribe_photo'] = {
            "photo_id": data_fields['subscribe_photo'],
            "image_path": settings.MEDIA_URL + queryset.get(id=data_fields['subscribe_photo'])
            }
        data_fields['created_at'] = int(instance.created_at.timestamp())

        return data_fields


class MagazineSerializer(serializers.ModelSerializer):
    activities = serializers.SerializerMethodField()
    tags = TagListSerializerField()
    sub_category = serializers.SlugRelatedField(
        read_only=True, slug_field='cat_name')
    category = serializers.SlugRelatedField(
        read_only=True, slug_field='cat_name')
    author_fullname = serializers.SerializerMethodField()

    class Meta:
        model = Magazine
        fields = ['id', 'title', 'author', 'author_fullname', 'summary', 'thumbnail',
                  'status', 'created_at', 'activities', 'tags', 'category', 'sub_category']

    def to_representation(self, instance):
        data_fields = super(MagazineSerializer, self).to_representation(instance)
        data_fields['created_at'] = int(instance.created_at.timestamp())
        return data_fields

    def get_author_fullname(self, instance):
        return instance.author.get_full_name()

    def get_activities(self, instance):
        like_num = MagazineLike.objects.filter(magazine_id=instance.id, is_enabled=True).count()
        comment_num = MagazineComment.objects.filter(magazine_id=instance.id, active=True).count()
        view_count = getattr(instance, 'view_count')
        return {
            'likes': like_num,
            'comments': comment_num,
            'views': view_count,
        }


class MagazineCommentSerializer(serializers.ModelSerializer):
    user_photo = serializers.SerializerMethodField()
    user_fullname = serializers.SerializerMethodField()

    class Meta:
        model = MagazineComment
        fields = ['cmt_id', 'user_id', 'user_fullname', 'user_photo', 'magazine_id', 'content', 'active', 'parent',
                  'created_at']
    # take the current magazine comment object from DB, which is a list => append a new comment to that list
    def to_representation(self, instance):
        data_fields = super(MagazineCommentSerializer,
                            self).to_representation(instance)
        data_fields['created_at'] = int(instance.created_at.timestamp())
        # data_fields['user_id'] = instance.user_id.first_name + \
            # ' ' + instance.user_id.last_name

        return data_fields

    def get_user_fullname(self, instance):
        return instance.user_id.get_full_name()

    def get_user_photo(self, instance):
        user_id = getattr(instance, 'user_id')
        user_photo = UserProfile.objects.get(user=user_id)
        return getattr(user_photo, "profile_photo").url

class MagazineLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MagazineLike
        fields = ['like_id', 'user_id', 'magazine_id', 'created_at']

    def to_representation(self, instance):
        data_fields = super(MagazineLikeSerializer, self).to_representation(instance)
        data_fields['created_at'] = int(instance.created_at.timestamp())

        return data_fields

class MagazineDetailSerializer(MagazineSerializer):
    likes = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    author_fullname = serializers.SerializerMethodField()
    
    class Meta:
        model = Magazine
        fields = ['id', 'title', 'formatted_markdown', 'status', 'thumbnail', 'banner', 'author', 'author_fullname',
                  'created_at', 'likes', 'comments', 'user_likes', 'tags', 'view_count', 'category', 'sub_category']
        removed_fields = []

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        removed_fields = kwargs.pop('removed_fields', None)

        # Instantiate the superclass normally
        super(MagazineSerializer, self).__init__(*args, **kwargs)

        if removed_fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            removed = set(removed_fields)
            existing = set(self.fields)
            for field_name in removed:
                self.fields.pop(field_name)

    def to_representation(self, instance):
        data_fields = super(MagazineSerializer, self).to_representation(instance)
        data_fields['created_at'] = int(instance.created_at.timestamp())
        # data_fields['author'] = instance.author.get_full_name()
        return data_fields

    def get_author_fullname(self, instance):
        return instance.author.get_full_name()

    def get_likes(self, instance):
        return MagazineLike.objects.filter(magazine_id=instance.id, is_enabled=True).count()

    def get_comments(self, instance):
        # get all comment with parent field is null
        comment_queryset = MagazineComment.objects.filter(magazine_id=instance.id, parent__isnull=True)
        # get all comment with parent field is not null
        reply_queryset = MagazineComment.objects.filter(magazine_id=instance.id, parent__isnull=False)
        # data = serializers.serialize('json', query)
        # get json of comment and reply
        comment_data =  MagazineCommentSerializer(comment_queryset, many=True).data
        reply_data =  MagazineCommentSerializer(reply_queryset, many=True).data
        # update "reply" feild if needed
        nested_comment(comment_data, reply_data)
        return comment_data


class MagazineSuggestSerializer(MagazineSerializer):
    interactive_pt = serializers.SerializerMethodField()

    class Meta:
        model = Magazine
        fields = ['id', 'title', 'author', 'content',
                  'status', 'created_at', 'activities', 'tags', 'interactive_pt']

    def get_interactive_pt(self, instance):
        org_tag_list = self.context.get("org_tag_list")
        org_author = self.context.get("org_author")
        tags_list = list(getattr(instance, 'tags').names())
        author = getattr(instance, 'author')

        logger.debug((tags_list))
        logger.debug(author)

        interactive_pt = calc_interactive_pt(
            org_tag_list, tags_list, org_author, author)
        return interactive_pt

class MagazineFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = MagazineFeature
        fields = ['id', 'feature_magazine', 'category', 'created_at']

    def to_representation(self, instance):
        data_fields = super(MagazineFeatureSerializer, self).to_representation(instance)
        result = Magazine.objects.filter(id=data_fields['feature_magazine']).first()
        result = MagazineSerializer(result).data
        data_fields['feature_magazine'] = result

        return data_fields

class MagazineCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = MagazineCategory
        fields = ['cat_id', 'cat_name', 'description', 'created_at', 'order']

    def to_representation(self, instance):
        data_fields = super(MagazineCategorySerializer, self).to_representation(instance)
        data_fields['created_at'] = int(instance.created_at.timestamp())

        return data_fields

class MagazineSubCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = MagazineSubCategory
        fields = ['cat_id', 'cat_name', 'description', 'created_at', 'order']

    def to_representation(self, instance):
        data_fields = super(MagazineSubCategorySerializer, self).to_representation(instance)
        data_fields['created_at'] = int(instance.created_at.timestamp())

        return data_fields
