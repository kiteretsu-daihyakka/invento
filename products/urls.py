from django.urls import path
from .views import index, product_list, product_detail, category_list
urlpatterns = [
    path('',index),
    path('products/', index),
    path('categories/', index),
    path('products/api/', product_list),
    path('categories/api/', category_list),
    path('<int:pk>', product_detail)
]