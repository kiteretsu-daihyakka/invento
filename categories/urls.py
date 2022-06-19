from django.urls import path
from .views import *

app_name = 'categories'

urlpatterns = [
    # path('', category_list, name='categories'),
    path('list/', CategoryList.as_view(), name='categories'),
    path('detail/<int:pk>', CategoryDetail.as_view(), name='category-detail'),
    # path('', category_detail, name='category'),
]