from django.urls import path
from .views import *

app_name = 'products'

urlpatterns = [
    path('', product_list, name='products'),
    path('<int:pk>', product_detail, name='product'),
    path('delete-multi', deleteMultiProduct, name='product-multi-delete')
]