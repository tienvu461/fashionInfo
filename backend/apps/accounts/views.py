from django.contrib.auth.models import User
from django.views import View
from django.http import JsonResponse
from requests import api
from .serializers import UserSerializer, CustomTokenObtainPairSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
import json, requests
from rest_framework_simplejwt.views import TokenObtainPairView
import urllib

class RedirectSocial(View):

    def get(self, request, *args, **kwargs):
        code, state = str(request.GET['code']), str(request.GET['state'])
        payload = {'code': code, 'state': state}
        payload = urllib.parse.urlencode(payload)
        print(payload)
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        url = "http://localhost:8000/api/social/o/google-oauth2/"
        response = requests.request("POST", url, headers=headers, data=payload)
        return JsonResponse(response.json())
        # return JsonResponse(payload) 
        
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

        url = "http://localhost:8000/api/users/activation/"
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
        data = {
            'uid': uid,
            'token': token,
            'new_password': new_password
        }
        print(data)
        url = 'http://localhost:8000/api/users/reset_password_confirm/'
        response = requests.post(url, data=data)
        if response.status_code == 200:
            return Response({"info": "Change password successfully"}, status=status.HTTP_200_OK)
        else:
            return Response(response.text, status=status.HTTP_400_BAD_REQUEST)