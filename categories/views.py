from django.shortcuts import render
from rest_framework import generics
# Create your views here.
from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from .serializers import CategorySerializer
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_204_NO_CONTENT
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.conf import settings
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from django.http import Http404

User = get_user_model()

class CategoryDetail(APIView):
    def get_object(self, pk):
        try:
            return Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        cat = self.get_object(pk)
        serializer = CategorySerializer(cat)
        return Response(serializer.data)

    def put(self, request, pk):
        cat = self.get_object(pk)
        auth_token = str(request.META.get('HTTP_AUTHORIZATION'))
        auth_token = auth_token.replace('Token ','')
        # business_user = request.data['token']
        print('token: ',auth_token)
        # print('all tokens: ', Token.objects.all().filter(key=auth_token.replace('Token ','')).values())
        token_user = Token.objects.get(key=auth_token).user
        # print('logged in user:', request.user)
        request.data['owner'] = token_user.id
        serializer = CategorySerializer(cat, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        cat = self.get_object(pk)
        cat.delete()
        return Response(status=HTTP_204_NO_CONTENT)

@api_view(['GET','PUT','DELETE'])
def category_detail(request,pk):
    try:
        category = Category.objects.get(pk=pk)
    except Category.DoesNotExist:
        return Response(status=HTTP_404_NOT_FOUND)
    
    if request.method=='GET':
        serializer = CategorySerializer(category)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CategorySerializer(category,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        catId = category.id
        catName = category.name
        category.delete()
        return Response(status=HTTP_204_NO_CONTENT)
            
class CategoryList(APIView):
    # queryset = Category.objects.filter(owner__id=request.user.id).order_by('-id')
    # serializer_class = 
    
    def get(self, request):
        auth_token = str(request.META.get('HTTP_AUTHORIZATION'))
        auth_token = auth_token.replace('Token ','')
        # business_user = request.data['token']
        print('token: ',auth_token)
        # print('all tokens: ', Token.objects.all().filter(key=auth_token.replace('Token ','')).values())
        token_user = Token.objects.get(key=auth_token).user
        print('token user ',token_user.username)
        # print('logged in user:', User.objects.get(id=token_user.user_id))
        queryset = Category.objects.filter(owner=token_user).order_by('-id')
        serializer = CategorySerializer(queryset, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        auth_token = str(request.META.get('HTTP_AUTHORIZATION'))
        auth_token = auth_token.replace('Token ','')
        # business_user = request.data['token']
        print('token: ',auth_token)
        # print('all tokens: ', Token.objects.all().filter(key=auth_token.replace('Token ','')).values())
        token_user = Token.objects.get(key=auth_token).user
        # print('logged in user:', request.user)
        request.data['owner'] = token_user.id
        # print('rd: ',request.data)
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            # print('errors:', serializer.errors)
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

# @api_view(['GET','POST'])
# def category_list(request):
#     if request.method == 'GET':
#         categories = Category.objects.filter(owner__id=request.user.id).order_by('-id')
#         print(categories)
#         serializer = CategorySerializer(categories,many=True)
#         print(serializer.data)
#         return Response(serializer.data)
    
#     elif request.method == 'POST':
#         serializer = CategorySerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data,status=HTTP_201_CREATED)
#         else:
#             return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)