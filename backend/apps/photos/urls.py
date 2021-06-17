from django.urls import path, include
from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from . import views

photos_urlpatterns = [
    url(r'^api/photos/$', views.PhotoList.as_view()),
    url(r'api/photos/(?P<pk>\d+)/', views.PhotoDetail.as_view()),
    url(r'api/photos/search', views.PhotoSearch.as_view()),
    url(r'api/photos/comment', views.PhotoCommentCreate.as_view()),
    url(r'api/photos/like', views.PhotoLikeCreate.as_view()),
    url(r'api/photos/suggest', views.PhotoSuggest.as_view()),
    url(r'api/photos/feature', views.PhotoFeatureDetail.as_view()),

    # done
    url(r'api/magazine/like', views.MagazineLikeCreate.as_view()),
    url(r'api/magazine/comment', views.MagazineCommentCreate.as_view()),
    url(r'api/magazine/category', views.MagazineCategoryList.as_view()),
    url(r'api/magazine/subcategory', views.MagazineSubCategoryList.as_view()),
    url(r'api/magazine/(?P<pk>\d+)/', views.MagazineDetail.as_view()),
    # url(r'api/magazine/feature', views.MagazineFeatureDetail.as_view()),
    url(r'api/magazine/search', views.MagazineSearch.as_view()),
    url(r'api/magazine/suggest', views.MagazineSuggest.as_view()),

    # in-progress
    url(r'^api/magazine/$', views.MagazineList.as_view()),

]

if settings.DEBUG:
    photos_urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT )
    photos_urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT )
