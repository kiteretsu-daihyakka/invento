from django.urls import path
from .views import *

app_name = 'categories'

urlpatterns = [
    # path('', category_list, name='categories'),
    path('', CategoryList.as_view(), name='categories'),
    path('<int:pk>', category_detail, name='category'),
]