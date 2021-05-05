from django.contrib.auth.models import User
from django.views import View
from django.http import JsonResponse
from .serializers import UserSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
import json

class RedirectSocial(View):

    def get(self, request, *args, **kwargs):
        code, state = str(request.GET['code']), str(request.GET['state'])
        json_obj = {'code': code, 'state': state}
        print(json_obj)
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
            # verify refresh token
            token = RefreshToken(refresh_token)
            # add refresh token to black list
            token.blacklist()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error':'Error from Black list token'},status=status.HTTP_400_BAD_REQUEST)