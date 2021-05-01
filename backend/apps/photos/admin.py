from django.contrib import admin
from .models import photo, generic_config
from django.utils.safestring import mark_safe

from markdownx.admin import MarkdownxModelAdmin

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
                    'mod_date', 'image_path')
    list_filter = ('created_date', 'mod_date', "status",)
    search_fields = ('title',)
    prepopulated_fields = {'slug': ('title',)}
    # readonly_fields = ('thumbail',)
    readonly_fields = ["preview"]

    def preview(self, obj):
        return mark_safe('<img src="{url}" width="{width}" height={height} />'.format(
            url=obj.image_path.url,
            width=obj.image_path.width if obj.image_path.width < 720 else 720,
            height=obj.image_path.height if obj.image_path.width < 720 else obj.image_path.height *
            720/obj.image_path.width,
        )
        )
