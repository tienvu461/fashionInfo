"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 3.1.2.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

from pathlib import Path
import os
from datetime import datetime, timedelta
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# SECRET_KEY = '%xi9&f=)h98&lk&sjgl5(!h%3qsi_d4+trpp&t2y-l7qc!kl8%'

SECRET_KEY = os.environ.get("SECRET_KEY")
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = bool(os.environ.get("DEBUG", default=0))

ALLOWED_HOSTS = os.environ.get("DJANGO_ALLOWED_HOSTS").split(" ")

# Application definition

INSTALLED_APPS = [
    'corsheaders',              # I always put it first here and in Middleware!
    'django.contrib.sites',     # We add this as extra
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # authentication
    'rest_framework',
    'social_django',          # Not needed to add but pip install required. Adding it here will create additional acces to social user via admin
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',  # Add it to avoid problems with migrations
    # allauth
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.facebook',
    'allauth.socialaccount.providers.google',
    'rest_framework.authtoken',
    'rest_auth',
    # for social login
    'rest_auth.registration',
    # djoser handle login request
    'djoser',
    # markdown for admin
    'markdownx',
    # dev apps
    'apps.accounts',
    'apps.photos',
]

# configure DRF
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',  # OAuth2, JWT
    ),
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],

    'DEFAULT_PAGINATION_CLASS':   
        'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 5,
    'MAX_PAGE_SIZE': 50,
}

SIMPLE_JWT = {
    'AUTH_HEADER_TYPES': ('Bearer', 'JWT',), # Adding Bearer for POSTMAN testing
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'AUTH_TOKEN_CLASSES': (
        'rest_framework_simplejwt.tokens.AccessToken',
        # 'location.to.custom.token.CustomJWTToken'    # This is optional - custom class where token could be manipulated e.g. enriched with tenants, UUIDs etc.
    ),
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
}

white_list = ['http://localhost:8000/accounts/profile/'] # URL you add to google developers console as allowed to make redirection

# configure Djoser
DJOSER = {
    "LOGIN_FIELD": "username", # Field we use to login on extended User model
    "USER_ID_FIELD": "username",
    "PERMISSIONS": {
        "user": ["rest_framework.permissions.AllowAny"],
        "user_list": ["rest_framework.permissions.AllowAny"],
    },
    "SERIALIZERS": {
        "user": "apps.accounts.serializers.UserSerializer", # Custom Serializer to show more user data
        "current_user": "apps.accounts.serializers.UserSerializer", # Custom Serializer to show more user data
    },
    "SOCIAL_AUTH_ALLOWED_REDIRECT_URIS": white_list # Redirected URL we listen on google console
}

# define which origins are allowed
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

MIDDLEWARE = [
    # IMPORTANT: CORS policies has to go before other entries
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # IMPORTANT: Essential when using django_social
    'social_django.middleware.SocialAuthExceptionMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect',
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# Logging configuration

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{asctime} {filename}({lineno}) [{levelname}]: {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose'
        },
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': 'logs/info.log',
            'formatter': 'verbose'
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'propagate': True,
        },
        'photos': {
            'handlers': [os.environ.get("LOGGING_HANDLER")],
            'propagate': True,
            'level': os.environ.get("LOGGING_LEVEL")
        }
    },
}

# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": os.environ.get("SQL_ENGINE", "django.db.backends.sqlite3"),
        "NAME": os.environ.get("SQL_DATABASE", os.path.join(BASE_DIR, "db.sqlite3")),
        "USER": os.environ.get("SQL_USER", "user"),
        "PASSWORD": os.environ.get("SQL_PASSWORD", "password"),
        "HOST": os.environ.get("SQL_HOST", "localhost"),
        "PORT": os.environ.get("SQL_PORT", "5432"),
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Ho_Chi_Minh'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'
MEDIA_URL = '/media/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
MEDIA_ROOT = os.path.join(BASE_DIR, 'media/')

MARKDOWNX_MEDIA_PATH = datetime.now().strftime('markdownx/%Y/%m/%d')

SITE_ID = 2

LOGIN_REDIRECT_URL = '/'

AUTHENTICATION_BACKENDS = (
# We are going to implement Google, choose the one you need from docs
'social_core.backends.google.GoogleOAuth2',
# Crucial when logging into admin with username & password
'django.contrib.auth.backends.ModelBackend',
'allauth.account.auth_backends.AuthenticationBackend',
)

# Client ID and Client Secret obtained from console.developers.google.com
# SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = '479323917045-vqqepkpp4v1ug5dqbp78hg4i4p9omeai.apps.googleusercontent.com'

# SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = 'klRCBHFVNB1nbVtqmaun9TPp'

SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = '436099598774-4o7gefl5g0qhkqf6n000rsus7am7vtpb.apps.googleusercontent.com'

SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = 'AesvA88jPH9Tv2ILQ4POYPSv'
# Allauth
ACCOUNT_LOGOUT_ON_GET = True