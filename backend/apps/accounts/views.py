from django.contrib.auth.models import User
from django.views import View
from django.http import JsonResponse
from .serializers import UserSerializer, CustomTokenObtainPairSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
import json, requests
import logging
from django.shortcuts import render

from django.conf import settings

from rest_framework_simplejwt.views import TokenObtainPairView

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
        payload = {'uid': "MTE", 'token': "an9yao-8fd339aad6882cd7bea53471df2faabd"}
        
        protocol = 'https://' if request.is_secure() else 'http://'
        url = "{0}{1}/api/users/activation/".format(protocol, settings.HOSTNAME)

        logger.debug("activation url: {}".format(url))

        # have to use template because post cannot be done on backend to itself
        return render(request, 'activation_page.html', {'url': url, 'uid': uid, 'token': token})

        # response = requests.post(url, data = payload)


        # if response.status_code == 204:
        #     return Response({}, response.status_code)
        # else:
        #     return Response(response.json())

class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer