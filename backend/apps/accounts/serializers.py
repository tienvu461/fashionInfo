from rest_framework import serializers
from django.contrib.auth.models import User
# import for email login
from rest_framework_simplejwt.serializers import TokenObtainSerializer
from rest_framework_simplejwt.tokens import RefreshToken
import logging
from django.db.models import Q

logger = logging.getLogger('photos')

class UserSerializer(serializers.ModelSerializer):

	class Meta:
		model = User
		fields = ('username', 'email', 'password')

class EmailTokenObtainSerializer(TokenObtainSerializer):
	username_field = User.EMAIL_FIELD

# overide the JWT generation class, make it be able to generate JWT by email
class CustomTokenObtainPairSerializer(EmailTokenObtainSerializer):
	@classmethod
	def get_token(cls, user):
		return RefreshToken.for_user(user)

	def validate(self, attrs):
		# validate user from POST request
		try:
			user = User.objects.get(
				Q(username=attrs['email']) | Q(email=attrs['email'])
			)
			user.check_password(attrs['password'])
		except:
			# in case fail to authenticate, manipulate validate method from TokenObtainSerializer to create auth fail response
			return super().validate(attrs)
		# generate JWT
		refresh = self.get_token(user)

		return {
			'refresh': str(refresh),
			'access': str(refresh.access_token)
		}