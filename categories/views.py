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
        category.delete()
        return Response(status=HTTP_204_NO_CONTENT)
            
class CategoryList(generics.ListCreateAPIView):
    # queryset = Category.objects.filter(owner__id=request.user.id).order_by('-id')
    serializer_class = CategorySerializer
    
    def list(self, request):
        print('logged in user:', request.user)
        queryset = Category.objects.filter(owner__id=request.user.id).order_by('-id')
        serializer = CategorySerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request, *args, **kwargs):
        print('logged in user:', request.user)
        request.data['owner'] = request.user.id
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(HTTP_200_OK)
        else:
            print('errors:', serializer.errors)

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