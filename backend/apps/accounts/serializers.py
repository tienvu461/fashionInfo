from django.db.models import Q
from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework_simplejwt.serializers import TokenObtainSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import default_user_authentication_rule

from rest_framework import serializers
from rest_framework import exceptions

from djoser.serializers import UserCreatePasswordRetypeSerializer

# import for email login
from django.utils.translation import gettext as _
import logging

from .models import UserProfile

logger = logging.getLogger('photos')


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')
        read_only_fields = ('email', )


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True, many=False)

    class Meta:
        model = UserProfile
        fields = ('user', 'social_url', 'dob', 'gender', 'profile_photo')

    # def get_email(self, instance):
    #     return instance.user.email

    # def update(self, instance, validated_data):
    #     logger.debug(self.data)
    #     user_data = validated_data.pop('user')
    #     username = self.data['user']['username']
    #     user = User.objects.get(username=username)
    #     logger.debug(user)
    #     user_serializer = UserProfileSerializer(data=user_data)
    #     if user_serializer.is_valid(raise_exception=True):
    #         user_serializer.update(user, user_data)
    #     else:
    #         logger.debug("invalid")
    #     instance.save()
    #     return instance

class EmailTokenObtainSerializer(TokenObtainSerializer):
    username_field = User.EMAIL_FIELD

    default_error_messages = {
        'no_active_account': _('No active account found with the given credentials')
    }

    def validate(self, attrs):
        authenticate_kwargs = {
            self.username_field: attrs[self.username_field],
            'username': attrs['username'],
            'password': attrs['password'],
        }
        try:
            authenticate_kwargs['request'] = self.context['request']
        except KeyError:
            pass

        self.user = authenticate(**authenticate_kwargs)

        if not default_user_authentication_rule(self.user):
            raise exceptions.AuthenticationFailed(
                self.error_messages['no_active_account'],
                'no_active_account',
            )

        return {}
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
        is_active = True if user is not None and user.is_active else False

        is_password_valid = user.check_password(attrs['password'])
        if not user or not is_password_valid or not is_active:
            # in case fail to authenticate, manipulate validate method from TokenObtainSerializer to create auth fail response
            return super().validate(attrs)
        # generate JWT
        refresh = self.get_token(user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }

# customize serializer that allow create first_name & last_name on creation
class UserCreateSerializerCustom(UserCreatePasswordRetypeSerializer):
    class Meta(UserCreatePasswordRetypeSerializer.Meta):
        fields = ('email', 'username', 'first_name', 'last_name', 'password', )
