from django.http.response import HttpResponse
from django.contrib.auth.models import User
from django.views import View
from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.conf import settings

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status, generics

import requests
import logging

from .serializers import UserSerializer, CustomTokenObtainPairSerializer, UserProfileSerializer
from .models import UserProfile

logger = logging.getLogger("photos")

class RedirectSocial(View):

    def get(self, request, *args, **kwargs):
        code, state = str(request.GET['code']), str(request.GET['state'])
        json_obj = {'code': code, 'state': state}
        logger.debug(json_obj)
         
        protocol = 'https://' if request.is_secure() else 'http://'
        host = "{0}{1}".format(protocol, settings.HOSTNAME)
        host = "http://api.tienvv.com"
        return render(request, 'social_redirect.html', {'host': host, 'code': code, 'state': state})
        return JsonResponse(json_obj)

# used to test auth
class UserListView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

# view to add refresh token to black list
class BlackListTokenView(APIView):
    permission_classes = (AllowAny,)
    # modify post method
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data.get("refresh")
            if refresh_token:
                # verify refresh token
                token = RefreshToken(refresh_token)
                # add refresh token to black list
                token.blacklist()
                return Response(status=status.HTTP_200_OK)

            return Response({'error':'invalid Refresh Token'},status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error':'Error from Black list token'},status=status.HTTP_400_BAD_REQUEST)

class ActivateUser(APIView):

    def get(self, request, uid, token, format = None):
        payload = {'uid': "MTE", 'token': "an9yao-8fd339aad6882cd7bea53471df2faabd"}
        
        protocol = 'https://' if request.is_secure() else 'http://'
        url = "{0}{1}/api/users/activation/".format(protocol, settings.HOSTNAME)
        host = "{0}{1}".format(protocol, settings.HOSTNAME)
        host = "http://api.tienvv.com"
        logger.debug("activation url: {}".format(url))

        return render(request, 'activation_page.html', {'host': host, 'url': url, 'uid': uid, 'token': token})
        response = requests.post(url, data = payload)

        # response = requests.post(url, data = payload)


        # if response.status_code == 204:
        #     return Response({}, response.status_code)
        # else:
        #     return Response(response.json())

class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class ForgotPasswordView(APIView):

    def post(self, request, uid, token, *args, **kwargs):
        new_password = request.data.get("new_password")
        re_new_password = request.data.get("re_new_password")
        data = {
            'uid': uid,
            'token': token,
            'new_password': new_password,
            're_new_password': re_new_password
        }

        url = 'http://{}/api/users/reset_password_confirm/'.format(settings.HOSTNAME)
        response = requests.post(url, data=data)
        if response.status_code == 204:
            return Response({"info": "Change password successfully"}, status=status.HTTP_200_OK)
        else:
            return Response(response.text, status=status.HTTP_400_BAD_REQUEST)


# Allow get user profile and update
class UserProfileViews(generics.RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    # queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    
    def get_object(self):
        return UserProfile.objects.get(user=self.request.user)

    # def get(self, request, *args, **kwargs):
    #     # view increment
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance)
    #     return Response(serializer.data)

   
    def update(self, request, *args, **kwargs):
        try:
            # update User model
            username = request.data['user']['username']
            email = request.data['user'].get('email')
            first_name = request.data['user'].get('first_name')
            last_name = request.data['user'].get('last_name')
            user = User.objects.get(username=username)
            user.email = email
            user.first_name = first_name
            user.last_name = last_name
            user.save()

            # update UserProfile model
            social_url = request.data.get('social_url')
            dob = request.data.get('dob')
            gender = request.data.get('gender', 0)
            user_profile = self.get_object()
            user_profile.social_url = social_url
            user_profile.dob = dob
            user_profile.gender = gender
            user_profile.save()
            # TODO: update profile picture
            return Response({"info": "Profile updated"}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error("Cannot update profile")
            logger.error(e)
