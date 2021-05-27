from django.urls import path, include
from .views import (
    RedirectSocial, 
    UserListView, 
    BlackListTokenView, 
    ActivateUser, 
    EmailTokenObtainPairView,
    ForgotPasswordView
)

accounts_urlpatterns = [
    path('api/', include('djoser.urls')),
    # The default Djoser endpoints for JWT.
    path('api/', include('djoser.urls.jwt')),
    # Djoser Beta extension for social_django
    path('api/social/', include('djoser.social.urls')),
    # The URL that you could use for testing and that later on can be used for Front-End app Authentication.
    path('accounts/profile/', RedirectSocial.as_view()),
    path('userlist/', UserListView.as_view()),
    path('api/token', EmailTokenObtainPairView.as_view()),
    path('api/user/logout/', BlackListTokenView.as_view(), name='logout-view'),
    path('api/user/activate/<str:uid>/<str:token>/', ActivateUser.as_view(), name='activate-view'),
    path('api/users/reset_password_confirm/<str:uid>/<str:token>/', ForgotPasswordView.as_view())
]