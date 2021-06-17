import logging
from django.db import models, transaction
from django import forms
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db.models.fields.related import ForeignKey
from django.utils import timezone
from markdownx.models import MarkdownxField
from markdownx.utils import markdownify
from taggit.managers import TaggableManager
from datetime import datetime

from .consts import modelConst, adminConst
from .utils import striphtml

logger = logging.getLogger("photos")

class GenericConfig(models.Model):
    config_name = models.CharField(default="default", max_length=50)
    short_description = models.CharField(default="Description", max_length=200)
    # weight value is ranged from [-10:10]
    likes_interact_weight = models.IntegerField(
        default=10, validators=[MaxValueValidator(10), MinValueValidator(-10)])
    comments_interact_weight = models.IntegerField(
        default=10, validators=[MaxValueValidator(10), MinValueValidator(-10)])
    views_interact_weight = models.IntegerField(
        default=10, validators=[MaxValueValidator(10), MinValueValidator(-10)])
    # other configuration
    show_activities = models.BooleanField(
        choices=modelConst.BINARY, default=False)
    in_use = models.BooleanField(choices=modelConst.BINARY, default=True)
    site_name = models.CharField(default="api.tienvv.com", max_length=50)

    # when updated, there is only 1 config in use = true, others are false
    def save(self, *args, **kwargs):
        if not self.in_use:
            return super(GenericConfig, self).save(*args, **kwargs)
        with transaction.atomic():
            GenericConfig.objects.filter(in_use=True).update(in_use=False)
            return super(GenericConfig, self).save(*args, **kwargs)

    def __str__(self):
        return self.config_name


class DateCreateModMixin(models.Model):
    class Meta:
        abstract = True

    created_date = models.DateTimeField(default=timezone.now)
    mod_date = models.DateTimeField(blank=True, null=True)


class PhotoCategory(models.Model):
    cat_id = models.AutoField(primary_key=True, null=False)
    cat_name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.cat_name

# Upload photo


class Photo(models.Model):
    title = models.CharField(max_length=50)
    slug = models.SlugField(max_length=255, unique=True, null=True)
    category = models.ForeignKey(PhotoCategory, on_delete=models.CASCADE)
    model_name = models.CharField(max_length=255, null=True, blank=True)
    model_job = models.CharField(max_length=255, null=True, blank=True)
    shoot_date = models.DateTimeField(null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    brand = models.CharField(max_length=255, null=True, blank=True)
    style = models.CharField(max_length=255, null=True, blank=True)
    photographer = models.CharField(max_length=255, null=True, blank=True)
    social_url = models.CharField(max_length=255, null=True, blank=True)
    post_date = models.DateTimeField(auto_now=True)
    tags = TaggableManager()
    # author = models.ForeignKey(
    #     User, on_delete=models.CASCADE, default="1")
    # body = MarkdownxField()
    # body = models.TextField()
    image_path = models.ImageField(
        upload_to=datetime.now().strftime('%Y/%m/%d'))
    status = models.IntegerField(choices=modelConst.STATUS, default=0)
    view_count = models.IntegerField(default=0)
    user_likes = models.ManyToManyField(User, related_name="users_like")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class PhotoLike(models.Model):
    like_id = models.AutoField(primary_key=True, null=False)
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE, null=False)
    photo_id = models.ForeignKey(
        Photo, on_delete=models.CASCADE, null=False)
    is_enabled = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class PhotoComment(models.Model):
    cmt_id = models.AutoField(primary_key=True, null=False)
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE, null=False)
    photo_id = models.ForeignKey(
        Photo, on_delete=models.CASCADE, null=False)
    content = models.CharField(max_length=255)
    # manually deactivate inappropriate comments from admin site
    active = models.BooleanField(default=True)
    parent = models.ForeignKey(
        'self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        # sort comments in chronological order by default
        ordering = ('created_at',)

    def __str__(self):
        return str(self.cmt_id)


def get_default_photo():
    return Photo.objects.last()


class PhotoFeature(models.Model):
    feature_photo = ForeignKey(
        Photo, related_name='feature', on_delete=models.CASCADE, default=get_default_photo)
    login_photo = ForeignKey(Photo, related_name='login',
                             on_delete=models.CASCADE, default=get_default_photo)
    signup_photo = ForeignKey(Photo, related_name='signup',
                              on_delete=models.CASCADE, default=get_default_photo)
    popup_photo = ForeignKey(Photo, related_name='popup',
                             on_delete=models.CASCADE, default=get_default_photo)
    subscribe_photo = ForeignKey(
        Photo, related_name='subscribe', on_delete=models.CASCADE, default=get_default_photo)
    in_use = models.BooleanField(choices=modelConst.BINARY, default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # when updated, there is only 1 config in use = true, others are false
    def save(self, *args, **kwargs):
        if not self.in_use:
            return super(PhotoFeature, self).save(*args, **kwargs)
        with transaction.atomic():
            PhotoFeature.objects.filter(in_use=True).update(in_use=False)
            return super(PhotoFeature, self).save(*args, **kwargs)


class MagazineCategory(models.Model):
    cat_id = models.AutoField(primary_key=True, null=False)
    cat_name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    order = models.IntegerField(unique=True, null=False)

    def __str__(self):
        return self.cat_name

class MagazineSubCategory(models.Model):
    cat_id = models.AutoField(primary_key=True, null=False)
    cat_name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    order = models.IntegerField(unique=True, null=False)

    def __str__(self):
        return self.cat_name

# Upload magazine


class Magazine(models.Model):
    title = models.CharField(max_length=50)
    slug = models.SlugField(max_length=255, unique=True, null=True)
    category = models.ForeignKey(MagazineCategory, on_delete=models.CASCADE)
    sub_category = models.ForeignKey(MagazineSubCategory, on_delete=models.CASCADE)
    tags = TaggableManager()
    author = models.ForeignKey(
        User, related_name='author', on_delete=models.CASCADE, default="1")
    thumbnail = models.ImageField(
        upload_to=datetime.now().strftime('%Y/%m/%d'), default='logos/default.png')
    banner = models.ImageField(
        upload_to=datetime.now().strftime('%Y/%m/%d'), default='logos/default.png') 
    content = MarkdownxField(default="Your content goes here")

    def formatted_markdown(self):
        return markdownify(self.content)

    status = models.IntegerField(choices=modelConst.STATUS, default=0)
    view_count = models.IntegerField(default=0)
    user_likes = models.ManyToManyField(User, related_name="magazine_users_like")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Magazine'
        verbose_name_plural = 'Magazine'
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    # get summary <= 150 chars
    def summary(self):
        summary = self.content[:150] 
        last_space = summary.rfind(" ")
        summary = summary[:last_space] + "..."
        return striphtml(markdownify(summary))
    summary.short_description = "Description"

class MagazineAttachedPhoto(models.Model):
    magazine = models.ForeignKey(
        Magazine, related_name='magazine_photo', on_delete=models.CASCADE)
    image = models.ImageField(
        upload_to=adminConst.ATTACH_DIR + datetime.now().strftime('%Y/%m/%d'), max_length=500)


class MagazineArchivedFile(models.Model):
    magazine = models.ForeignKey(
        Magazine, related_name='magazine_file', on_delete=models.CASCADE)
    zip_file = models.FileField(
        upload_to=adminConst.ARCHIVED_DIR + datetime.now().strftime('%Y/%m/%d'), max_length=500)

class MagazineLike(models.Model):
    like_id = models.AutoField(primary_key=True, null=False)
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE, null=False)
    magazine_id = models.ForeignKey(
        Magazine, on_delete=models.CASCADE, null=False)
    is_enabled = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class MagazineComment(models.Model):
    cmt_id = models.AutoField(primary_key=True, null=False)
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE, null=False)
    magazine_id = models.ForeignKey(
        Magazine, on_delete=models.CASCADE, null=False)
    content = models.CharField(max_length=255)
    # manually deactivate inappropriate comments from admin site
    active = models.BooleanField(default=True)
    parent = models.ForeignKey(
        'self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        # sort comments in chronological order by default
        ordering = ('created_at',)

    def __str__(self):
        return str(self.cmt_id)

def get_default_magazine():
    return Magazine.objects.get_or_create(id=1)
class MagazineFeature(models.Model):
    feature_magazine = ForeignKey(
        Magazine, related_name='feature', on_delete=models.CASCADE, default=get_default_magazine)
    in_use = models.BooleanField(choices=modelConst.BINARY, default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # when updated, there is only 1 config in use = true, others are false
    def save(self, *args, **kwargs):
        if not self.in_use:
            return super(MagazineFeature, self).save(*args, **kwargs)
        with transaction.atomic():
            MagazineFeature.objects.filter(in_use=True).update(in_use=False)
            return super(MagazineFeature, self).save(*args, **kwargs)
