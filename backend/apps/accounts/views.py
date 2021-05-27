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
        print(json_obj)
        return render(request, 'social_redirect.html', {'code': code, 'state': state})
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
        payload = {'uid': uid, 'token': token}
        
        protocol = 'https://' if request.is_secure() else 'http://'
        url = "{0}{1}/api/users/activation/".format(protocol, settings.HOSTNAME)

        logger.debug("activation url: {}".format(url))

        # return render(request, 'activation_page.html', {'url': url, 'uid': uid, 'token': token})
        response = requests.post(url, data = payload)


        if response.status_code == 204:
            return Response({}, response.status_code)
        else:
            return Response(response.json())

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

class UserProfileViews(generics.RetrieveAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get(self, request, *args, **kwargs):
        # view increment
        instance = self.get_object()
        instance.view_count = instance.view_count + 1
        instance.save(update_fields=("view_count", ))

        # getting show/hide setting from Generic Config tbl
        config_obj = GenericConfig.objects.filter(in_use=True)
        try:
            show_activities = config_obj.values().first()["show_activities"]
            logger.debug("show_activities = {}".format(show_activities))
        except Exception as e:
            logger.error("Cannot get config\nException: {}".format(e))
            show_activities = True
        if show_activities:
            serializer = self.get_serializer(instance)
        else:
            serializer = self.get_serializer(
                instance, removed_fields=('likes', 'comments',))

        return Response(serializer.data)