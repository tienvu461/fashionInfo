from django.urls import path, include

from django.views.generic import TemplateView
from .views import RedirectSocial, UserListView

accounts_urlpatterns = [
    path('api/', include('djoser.urls')),
    # The default Djoser endpoints for JWT.
    path('api/', include('djoser.urls.jwt')),
    # Djoser Beta extension for social_django
    path('api/social/', include('djoser.social.urls')),
    # The URL that you could use for testing and that later on can be used for Front-End app Authentication.
    path('accounts/profile/', RedirectSocial.as_view()),
    path('userlist/', UserListView.as_view()),
    path('accounts/', include('allauth.urls')),
    path('', TemplateView.as_view(template_name='accounts/index.html'))
]