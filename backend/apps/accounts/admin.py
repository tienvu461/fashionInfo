from django.contrib import admin
from rest_framework_simplejwt import token_blacklist

import logging

from .models import UserProfile

from django import forms
logger = logging.getLogger('photos')
# in order to make admin can delete outstanding token
class OutstandingTokenAdmin(token_blacklist.admin.OutstandingTokenAdmin):

    def has_delete_permission(self, *args, **kwargs):
        return True # or whatever logic you want

admin.site.unregister(token_blacklist.models.OutstandingToken)
admin.site.register(token_blacklist.models.OutstandingToken, OutstandingTokenAdmin)


@admin.register(UserProfile)
class UserProfile(admin.ModelAdmin):
    list_display = ('user', 'profile_photo',)
    list_filter = ('created_at',)
    search_fields = ('user',)