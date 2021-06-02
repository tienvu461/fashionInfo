from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save

# from social_auth.backends.facebook import FacebookBackend
# from social_auth.backends import google
# from social_auth.signals import socialauth_registered

from .consts import modelConst


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    gender = models.IntegerField(choices=modelConst.GENDER, default=0)
    dob = models.DateField(blank=True, null=True)
    social_url = models.CharField(
        max_length=255, blank=True, null=True, default='')
    profile_photo = models.ImageField(
        upload_to='profiles', default='profiles/default_user.png')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s's profile" % self.user


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


post_save.connect(create_user_profile, sender=User)
