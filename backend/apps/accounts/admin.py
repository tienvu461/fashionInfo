from django.contrib import admin
from .models import photo_tbl, generic_config_tbl, uploaded_photo

from markdownx.admin import MarkdownxModelAdmin

# class PostAdmin(admin.ModelAdmin):
#     list_display = ('title', 'slug', 'status', 'created_on')
#     list_filter = ("status",)
#     search_fields = ['title', 'content']
#     prepopulated_fields = {'slug': ('title',)}


# admin.site.register(Post, PostAdmin)

@admin.register(generic_config_tbl)
class GenericConfigAdmin(admin.ModelAdmin):
    list_display = ('config_name', 'blog_name', 'in_use')

class ImageInline(admin.TabularInline):
    model = uploaded_photo
    extra = 3

@admin.register(photo_tbl)
class PhotoAdmin(MarkdownxModelAdmin):
    list_display = ('title',  "status", 'created_date', 'mod_date',)
    list_filter = ('created_date', 'mod_date', "status",)
    search_fields = ('title',)
    prepopulated_fields = {'slug': ('title',)}

    inlines = [ ImageInline, ]

