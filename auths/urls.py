from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import *
from rest_framework.authtoken.views import obtain_auth_token

app_name = 'auths'

urlpatterns = [
    # path('login', do_login, name='login'),
    path('signup', do_signup, name='signup'),
    path('check-login', check_login, name='check-login'),
    path('another-login', obtain_auth_token , name='another-login')
    # path('another-login', AutheViewSet.as_view({'get': 'list'}) , name='another-login-apprch')
]

if settings.DEBUG:
    urlpatterns+=static(settings.STATIC_URL,document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
