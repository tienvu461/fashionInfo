from django.contrib import admin
from django.forms import ModelForm
from django.core.files.images import ImageFile
from django.utils.safestring import mark_safe
from django.conf import settings
from markdownx.admin import MarkdownxModelAdmin

import logging
import base64
import zipfile
import re
from datetime import datetime

from .models import NewsCategory, Photo, PhotoFeature, PhotoLike, PhotoComment, News, NewsAttachedPhoto, NewsArchivedFile, NewsLike, NewsComment, GenericConfig, PhotoCategory, NewsFeature, NewsSubCategory
from .consts import adminConst

from django import forms
logger = logging.getLogger('photos')


# class CustomizedConfigForm(ModelForm):
#     class Meta:
#         model = GenericConfig
#         fields = "__all__"
#         widgets = {
#             # "published": DjangoToggleSwitchWidget(klass="django-toggle-switch-dark-primary"),
#             "in_use": forms.RadioSelect,
#             "show_activities": forms.RadioSelect,
#         }

@admin.register(GenericConfig)
class GenericConfigAdmin(admin.ModelAdmin):
    # form = CustomizedConfigForm
    list_display = ('config_name', 'show_activities',
                    'in_use', 'short_description')


@admin.register(PhotoFeature)
class PhotoFeatureAdmin(admin.ModelAdmin):
    # form = CustomizedConfigForm
    list_display = ('id', 'feature_photo', 'login_photo', 'signup_photo',
                    'popup_photo', 'subscribe_photo', 'in_use', 'created_at')


@admin.register(Photo)
class PhotoAdmin(MarkdownxModelAdmin):
    list_display = ('title',  "status", 'created_at',
                    'updated_at', 'image_path', 'thumbnail', 'get_category', 'tag_list', 'view_count')
    list_filter = ('created_at', 'updated_at', "status",)
    exclude = ('user_likes',)
    search_fields = ('title',)
    prepopulated_fields = {'slug': ('title',)}
    # readonly_fields = ('thumbail',)
    readonly_fields = ['preview', 'view_count']

    # show tags in list
    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related('tags')

    def tag_list(self, obj):
        return u", ".join(o.name for o in obj.tags.all())

    def get_category(self, obj):
        return obj.category.cat_name
    get_category.admin_order_field = 'category'  # Allows column order sorting
    get_category.short_description = 'Category'  # Renames column head
    # show preview when uploaded

    def preview(self, obj):
        return mark_safe('<img src="{url}" width="{width}" height={height} />'.format(
            url=obj.image_path.url,
            width=obj.image_path.width if obj.image_path.width < adminConst.WIDTH_XL else adminConst.WIDTH_XL,
            height=obj.image_path.height if obj.image_path.width < adminConst.WIDTH_XL else obj.image_path.height *
            adminConst.WIDTH_XL/obj.image_path.width,
        )
        )
    # show thumbnail on list

    def thumbnail(self, obj):
        if obj.image_path:
            return mark_safe('<img src="{url}" width="{width}" height={height} />'.format(
                url=obj.image_path.url,
                width=obj.image_path.width if obj.image_path.width < adminConst.WIDTH_XS else adminConst.WIDTH_XS,
                height=obj.image_path.height if obj.image_path.width < adminConst.WIDTH_XS else obj.image_path.height *
                adminConst.WIDTH_XS/obj.image_path.width,
            )
            )
        else:
            return 'Not found'
    thumbnail.short_description = 'Thumbnail'
    thumbnail.allow_tags = True

# Not really need admin for like & dislike


@admin.register(PhotoLike)
class PhotoLikeAdmin(admin.ModelAdmin):
    list_display = ('like_id', 'photo_id', 'user_id', 'created_at')


@admin.register(PhotoComment)
class PhotoCommentAdmin(admin.ModelAdmin):
    list_display = ('cmt_id', 'photo_id', 'user_id', 'content',
                    'active', 'parent', 'created_at',)
    list_filter = ('created_at', 'active',)
    search_fields = ('content',)


class ImageInline(admin.TabularInline):
    model = NewsAttachedPhoto
    extra = 3


class FileInline(admin.TabularInline):
    model = NewsArchivedFile
    max_num = 1

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        logger.debug("id = {}".format(obj.id))
        archived_all = NewsArchivedFile.objects.all().count()
        logger.debug("archived_all = {}".format(archived_all))


@admin.register(News)
class NewsAdmin(MarkdownxModelAdmin):
    list_display = ('title',  'status', 'summary', 'tag_list', 'created_at',
                    'updated_at')
    list_filter = ('created_at', 'updated_at', "status",)
    search_fields = ('title',)
    prepopulated_fields = {'slug': ('title',)}
    exclude = ('user_likes',)

    # show tags in list
    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related('tags')

    def tag_list(self, obj):
        return u", ".join(o.name for o in obj.tags.all())

    # show attached images and achived file
    inlines = [ImageInline, FileInline]

    # TODO: must save twice to work
    def save_model(self, request, obj, form, change):
        # obj.content = "overriden"
        super().save_model(request, obj, form, change)
        logger.debug("id = {}".format(obj.id))
        # archived_all = NewsArchivedFile.objects.all().count()
        # logger.debug("archived_all = {}".format(archived_all))
        try:
            archived = NewsArchivedFile.objects.get(news_id=obj.id)
        except Exception as e:
            logger.error("Cannot get archived file")
            logger.error(e)
        else:
            logger.debug(type(archived))

            with zipfile.ZipFile(archived.zip_file, 'r') as f_list:
                for f_name in f_list.namelist():
                    if '.md' in f_name:
                        with f_list.open(f_name) as md_file:
                            img_ptn = re.compile(r"\]\((.*.jpg)\)")
                            content = md_file.read().decode('utf8')
                            prefix = "{0}{1}".format(
                                settings.MEDIA_URL, adminConst.ATTACH_DIR)+datetime.now().strftime('%Y/%m/%d/')
                            content = re.sub(
                                img_ptn, rf"]({prefix}\1)", content)
                            obj.content = content

                    if '.jpg' in f_name:
                        with f_list.open(f_name, "r") as jpg_file:
                            NewsAttachedPhoto.objects.create(
                                news_id=obj.id, image=ImageFile(jpg_file))
            # delete zipfile after extracted
            file_path = archived.zip_file
            logger.debug(file_path)
            result = NewsArchivedFile.objects.filter(news_id=obj.id).delete()
            logger.debug("NewsArchivedFile delete result = {}".format(result))
        obj.save()

@admin.register(NewsComment)
class NewsCommentAdmin(admin.ModelAdmin):
    list_display = ('news_id', 'user_id', 'content',
                    'active', 'parent', 'created_at',)
    list_filter = ('created_at', 'active',)
    search_fields = ('content',)


@admin.register(PhotoCategory)
class PhotoCategoryAdmin(admin.ModelAdmin):
    list_display = ('cat_name', 'created_at')


@admin.register(NewsCategory)
class NewsCategoryAdmin(admin.ModelAdmin):
    list_display = ('cat_name', 'created_at')


@admin.register(NewsFeature)
class NewsFeatureAdmin(admin.ModelAdmin):
    # form = CustomizedConfigForm
    list_display = ('id', 'feature_news', 'in_use', 'created_at')

@admin.register(NewsSubCategory)
class NewsSubCategoryAdmin(admin.ModelAdmin):
    list_display = ('cat_name', 'created_at')