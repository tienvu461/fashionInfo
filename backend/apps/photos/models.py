from django.db import models, transaction
from django import forms
from django.contrib.auth.models import User
from django.utils import timezone
from markdownx.models import MarkdownxField
from datetime import datetime


STATUS = (
    (0, "Draft"),
    (1, "Publish")
)


class generic_config(models.Model):
    config_name = models.CharField(default = "default", max_length=50)
    short_description = models.CharField(default = "Description", max_length=200)
    in_use = models.BooleanField(default = False)

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
class photo(DateCreateModMixin):
    title = models.CharField(max_length=50)
    slug = models.SlugField(max_length=200, unique=True, null=True)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, default="1")
    # body = MarkdownxField()
    # body = models.TextField()
    image_path = models.ImageField(upload_to=datetime.now().strftime('%Y/%m/%d'))
    status = models.IntegerField(choices=STATUS, default=0)


    class Meta:
        ordering = ['-created_date']

    def __str__(self):
        return self.title

    def thumbnail(self):
        return u'<img src="%s" />' % (self.image_path.url)
    thumbnail.short_description = 'Thumbnail'

# Note: background_image is just for my header background, not MarkdownX

# list of images uploaded in a blog post
# class uploaded_photo(models.Model):
#     post = models.ForeignKey(photo, related_name='images', on_delete=models.CASCADE)
#     image = models.ImageField(upload_to=datetime.now().strftime('%Y/%m/%d'))
    # image_name = models.CharField(max_length=50)