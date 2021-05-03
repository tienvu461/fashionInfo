from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from . import views

photos_urlpatterns = [
    path('photos/', views.PhotoList.as_view()),
    path('photos/<int:pk>/', views.PhotoList.as_view()),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

photos_urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)