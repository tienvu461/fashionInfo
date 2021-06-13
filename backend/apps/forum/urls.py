from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from . import views

import spirit.urls

forum_urlpatterns = [
    # overriding paths
    re_path(r'^forum/$', views.index_active, name='index'),
    re_path(r'^forum/topic/active/$', views.index_active, name='index-active'),
    # spirit paths
    re_path(r'^forum/', include(spirit.urls)),
]

if settings.DEBUG:
    forum_urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT )
    forum_urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT )
