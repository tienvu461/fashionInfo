from django.urls import path, include
from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from . import views

photos_urlpatterns = [
    url(r'^photos/$', views.PhotoList.as_view()),
    url(r'photos/(?P<pk>\d+)/', views.PhotoDetail.as_view()),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

photos_urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)