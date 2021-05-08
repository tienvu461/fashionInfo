from django.db import models, transaction
from django import forms
from django.contrib.auth.models import User
from django.utils import timezone
from markdownx.models import MarkdownxField
from markdownx.utils import markdownify
from datetime import datetime

from .consts import modelConst

class GenericConfig(models.Model):
    config_name = models.CharField(default="default", max_length=50)
    short_description = models.CharField(default="Description", max_length=200)
    in_use = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.in_use:
            return super(generic_config, self).save(*args, **kwargs)
        with transaction.atomic():
            generic_config.objects.filter(
                in_use=True).update(in_use=False)
            return super(generic_config, self).save(*args, **kwargs)

    def __str__(self):
        return self.config_name


class DateCreateModMixin(models.Model):
    class Meta:
        abstract = True

    created_date = models.DateTimeField(default=timezone.now)
    mod_date = models.DateTimeField(blank=True, null=True)


# Upload photo
class Photo(models.Model):
    title = models.CharField(max_length=50)
    slug = models.SlugField(max_length=200, unique=True, null=True)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, default="1")
    # body = MarkdownxField()
    # body = models.TextField()
    image_path = models.ImageField(
        upload_to=datetime.now().strftime('%Y/%m/%d'))
    status = models.IntegerField(choices=modelConst.STATUS, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


# Upload news
class News(models.Model):
    title = models.CharField(max_length=50)
    slug = models.SlugField(max_length=200, unique=True, null=True)
    author = models.ForeignKey(
        User, related_name='author', on_delete=models.CASCADE, default="1")
    content = MarkdownxField()

    def formatted_markdown(self):
        return markdownify(self.content)

    def content_summary(self):
        return markdownify(self.content[:300] + "...")

    status = models.IntegerField(choices=modelConst.STATUS, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'News'
        verbose_name_plural = 'News'
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    # truncate text in list admin view
    def get_description(self):
        return markdownify(self.content[:300] + "...")
    content_summary.short_description = "Description"

class NewsAttachedPhoto(models.Model):
    news = models.ForeignKey(News, related_name='news_photo', on_delete=models.CASCADE)
    image = models.ImageField(upload_to="attached/"+datetime.now().strftime('%Y/%m/%d'), max_length=500)

class NewsArchivedFile(models.Model):
    news = models.ForeignKey(News, related_name='news_file', on_delete=models.CASCADE)
    zip_file = models.FileField(upload_to="archived/"+datetime.now().strftime('%Y/%m/%d'), max_length=500)

class Like(models.Model):
    like_id = models.AutoField(primary_key=True, null=False)
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE, null=False)
    post_type = models.IntegerField(choices=modelConst.POST_TYPES, null=False)
    post_id = models.IntegerField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Dislike(models.Model):
    like_id = models.AutoField(primary_key=True, null=False)
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE, null=False)
    post_type = models.IntegerField(choices=modelConst.POST_TYPES, null=False)
    post_id = models.IntegerField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Comment(models.Model):
    cmt_id = models.AutoField(primary_key=True, null=False)
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE, null=False)
    post_type = models.IntegerField(choices=modelConst.POST_TYPES, null=False)
    post_id = models.IntegerField(null=False)
    content = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Tag(models.Model):
    tag_id = models.AutoField(primary_key=True, null=False)
    tag_name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)