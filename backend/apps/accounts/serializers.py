from django.db.models import Q
from django.db import models
from django.contrib.auth.models import User
# import for email login
from rest_framework_simplejwt.serializers import TokenObtainSerializer
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

import logging

from .models import UserProfile

logger = logging.getLogger('photos')

class UserSerializer(serializers.ModelSerializer):

	class Meta:
		model = User
		fields = ('username', 'email', 'password')

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        models = UserProfile
        fields = ('user', 'profile_photo')
class EmailTokenObtainSerializer(TokenObtainSerializer):
	username_field = User.EMAIL_FIELD

# overide the JWT generation class, make it be able to generate JWT by email
class CustomTokenObtainPairSerializer(EmailTokenObtainSerializer):
	@classmethod
	def get_token(cls, user):
		return RefreshToken.for_user(user)

	def validate(self, attrs):
		# validate user from POST request
		
		user = User.objects.get(
			Q(username=attrs['email']) | Q(email=attrs['email'])
		)
		is_password_valid = user.check_password(attrs['password'])
		if not user or not is_password_valid:
			# in case fail to authenticate, manipulate validate method from TokenObtainSerializer to create auth fail response
			return super().validate(attrs)
		# generate JWT
		refresh = self.get_token(user)

		return {
			'refresh': str(refresh),
			'access': str(refresh.access_token)
		}