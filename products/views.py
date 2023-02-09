from django.shortcuts import render
from django.http import HttpResponse
from .models import Product, Sell
from .serializers import ProductSerializer
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_204_NO_CONTENT
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.authtoken.models import Token
import cv2
import numpy as np

# class ProductList(generics.ListCreateAPIView):
#     queryset = Product.objects.all().order_by('-id')
#     serializer_class = ProductSerializer
    
#     def create(self, request, *args, **kwargs):
#         print('logged in user:', request.user)
#         serializer = self.get_serializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(HTTP_200_OK)
#         else:
#             print('errors:', serializer.errors)
            
@api_view(['GET','POST'])
def product_list(request):
    if request.method == 'GET':
        auth_token = str(request.META.get('HTTP_AUTHORIZATION'))
        auth_token = auth_token.replace('Token ','')
        print('token: ',auth_token)
        token_user = Token.objects.get(key=auth_token).user
        print(type(token_user))
        print('id of user: ',token_user.id)
        products = Product.objects.filter(category__owner=token_user).order_by('-id')
        print(products)
        serializer = ProductSerializer(products,many=True)
        print(serializer.data)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','DELETE'])
def product_detail(request,pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response(status=HTTP_404_NOT_FOUND)
    
    if request.method=='GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ProductSerializer(product,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        product.delete()
        return Response(status=HTTP_204_NO_CONTENT)
    
@api_view(['PUT','DELETE'])
def deleteMultiProduct(request):
    if request.method == 'PUT':
        print('put del:::',request.data)
        # for prodID in request.data:
        #     print('prodID to delete:',prodID)
        objsToDel = Product.objects.filter(id__in=request.data)
        objsToDel.delete()
        return Response(status=HTTP_204_NO_CONTENT)
    # elif request.method == 'DELETE':
    #     print('del del:::',request.data)

@api_view(['POST','PUT'])
def add_auto_sell(request):
    if request.method == 'PUT':
        img = request.data['image'].file
        print('image data: ', img)
        # img = cv2.imread(request.data['image'].file)
        np_arr_img = np.asarray(np.frombuffer(request.data['image'].file.read() , np.uint8))
        print(type(np_arr_img))
        Sell(purchase_img=img).save()
        # img = cv2.(np_arr_img, cv2.IMREAD_UNCHANGED)
        # print(type(img))
        #cv2.imshow('Misa',np_arr_img)
        
        # serializer = ProductSerializer(data=request.data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data,status=HTTP_201_CREATED)
        # else:
        #     return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)
    return Response(status=HTTP_200_OK)