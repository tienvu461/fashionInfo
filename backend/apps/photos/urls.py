from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

photos_urlpatterns = [
    
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

photos_urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)