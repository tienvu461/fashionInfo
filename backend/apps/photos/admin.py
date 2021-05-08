from django.contrib import admin
from django.utils.safestring import mark_safe
from markdownx.admin import MarkdownxModelAdmin
from django.core.files.images import ImageFile

import logging
import base64
import zipfile
import re
from datetime import datetime

from .models import Photo, News, NewsAttachedPhoto, NewsArchivedFile, GenericConfig
from .consts import adminConst

logger = logging.getLogger('photos')

# class PostAdmin(admin.ModelAdmin):
#     list_display = ('title', 'slug', 'status', 'created_on')
#     list_filter = ("status",)
#     search_fields = ['title', 'content']
#     prepopulated_fields = {'slug': ('title',)}


# admin.site.register(Post, PostAdmin)

@admin.register(GenericConfig)
class GenericConfigAdmin(admin.ModelAdmin):
    list_display = ('config_name', 'in_use')

# class ImageInline(admin.TabularInline):
#     model = uploaded_photo
    # extra = 3


@admin.register(Photo)
class PhotoAdmin(MarkdownxModelAdmin):
    list_display = ('title',  "status", 'created_at',
                    'updated_at', 'image_path', 'thumbnail')
    list_filter = ('created_at', 'updated_at', "status",)
    search_fields = ('title',)
    prepopulated_fields = {'slug': ('title',)}
    # readonly_fields = ('thumbail',)
    readonly_fields = ['preview', 'slug']

    # show thumbnail when uploaded

    def preview(self, obj):
        return mark_safe('<img src="{url}" width="{width}" height={height} />'.format(
            url=obj.image_path.url,
            width=obj.image_path.width if obj.image_path.width < adminConst.WIDTH_XL else adminConst.WIDTH_XL,
            height=obj.image_path.height if obj.image_path.width < adminConst.WIDTH_XL else obj.image_path.height *
         adminConst.WIDTH_XL/obj.image_path.width,
        )
        )

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
    list_display = ('title',  "status", 'created_at',
                    'updated_at', 'get_description')
    list_filter = ('created_at', 'updated_at', "status",)
    search_fields = ('title',)
    prepopulated_fields = {'slug': ('title',)}
    
    # show attached images and achived file
    inlines = [ImageInline, FileInline]
    
    # TODO: must save twice to work
    def save_model(self, request, obj, form, change):
        # obj.content = "overriden"
        super().save_model(request, obj, form, change)
        logger.debug("id = {}".format(obj.id))
        archived_all = NewsArchivedFile.objects.all().count()
        logger.debug("archived_all = {}".format(archived_all))
        try:
            archived =  NewsArchivedFile.objects.get(news_id=obj.id)
        except Exception as e:
            logger.error(e)
        else:
            logger.debug(type(archived))

            with zipfile.ZipFile(archived.zip_file, 'r') as f_list:
                for f_name in f_list.namelist():
                    if '.md' in f_name:
                        with f_list.open(f_name) as md_file:
                            img_ptn = re.compile(r"\]\((.*.jpg)\)")
                            content = md_file.read().decode('utf8')
                            prefix = "/media/attached/"+datetime.now().strftime('%Y/%m/%d/')
                            content =re.sub(img_ptn, rf"]({prefix}\1)", content)
                            obj.content = content

                    if '.jpg' in f_name:
                        with f_list.open(f_name, "r") as jpg_file:
                            NewsAttachedPhoto.objects.create(news_id=obj.id, image= ImageFile(jpg_file))
            # delete zipfile after extracted
            result =  NewsArchivedFile.objects.filter(news_id=obj.id).delete()
            logger.debug("NewsArchivedFile delete result = {}".format(result))
        obj.save()

