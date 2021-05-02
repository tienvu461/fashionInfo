from django.contrib import admin
from .models import photo, news, generic_config
from django.utils.safestring import mark_safe

from markdownx.admin import MarkdownxModelAdmin

from .consts import adminConst
# class PostAdmin(admin.ModelAdmin):
#     list_display = ('title', 'slug', 'status', 'created_on')
#     list_filter = ("status",)
#     search_fields = ['title', 'content']
#     prepopulated_fields = {'slug': ('title',)}


# admin.site.register(Post, PostAdmin)

@admin.register(generic_config)
class GenericConfigAdmin(admin.ModelAdmin):
    list_display = ('config_name', 'in_use')

# class ImageInline(admin.TabularInline):
#     model = uploaded_photo
    # extra = 3


@admin.register(photo)
class PhotoAdmin(MarkdownxModelAdmin):
    list_display = ('title',  "status", 'created_date',
                    'mod_date', 'image_path', 'thumbnail')
    list_filter = ('created_date', 'mod_date', "status",)
    search_fields = ('title',)
    prepopulated_fields = {'slug': ('title',)}
    # readonly_fields = ('thumbail',)
    readonly_fields = ["preview"]

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

@admin.register(news)
class NewsAdmin(MarkdownxModelAdmin):
    list_display = ('title',  "status", 'created_date',
                    'mod_date', 'get_description')
    list_filter = ('created_date', 'mod_date', "status",)
    search_fields = ('title',)
    prepopulated_fields = {'slug': ('title',)}
