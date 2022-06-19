from django.shortcuts import render
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.status import HTTP_200_OK,HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND, HTTP_204_NO_CONTENT
from categories.models import Business
from .serializers import BusinessSerializer
from django.contrib.auth import authenticate, login, logout

# Create your views here.
# @api_view(['POST'])
# def do_login(request):
#     print('request data: ', request.data)
#     if try_login(request,request.data['username'],request.data['password']):
#         print('loggg usr ', request.user )
#         return Response(status=HTTP_200_OK)
#     else:
#         print('login returned false')
#         return Response(status=HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def do_signup(request):
    # print('signed in user: ', request.user.username) 
    if request.method == 'POST':
        # print('req data', request.data)
        serializer = BusinessSerializer(data=request.data)
        # print('serializer',serializer)
        if serializer.is_valid():
            serializer.save()
            # if try_login(request, serializer.data['username'], serializer.data['password']):
            return Response(status=HTTP_201_CREATED)
            # else:
            #     print('login returned false')
            #     return Response(status=HTTP_400_BAD_REQUEST)
        else:
            print('serialziers errors')
            return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)
    else:
        return Response(status=HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def check_login(request):
    if request.method == 'GET':
        try:
            user = Business.objects.get(id=request.user.id)
            if try_login(request,user.username,user.password):
                print('logged in userllllll: ', request.user)
                return Response({'businessName':user.name,'username':user.username},status=HTTP_200_OK)
            else:
                print('failed...............')
                return Response({'error':'Invalid Username or Password.'})        
        except Business.DoesNotExist:
            return Response(status=HTTP_401_UNAUTHORIZED)
    else:
        return Response(status=HTTP_400_BAD_REQUEST)

def try_login(request,username,password):
    print(username)
    print(password)
    # authentic_usr = authenticate(request, username=username,password=password)
    authentic_usr = Business.objects.filter(username=username,password=password)
    if len(authentic_usr) is not 0:
        login(request,authentic_usr[0])
        return True
    else:
        return False

# from django.contrib.auth import get_user_model
# from django.core.exceptions import ImproperlyConfigured
# from rest_framework import viewsets, status
# from rest_framework.decorators import action
# from rest_framework.permissions import AllowAny
# from rest_framework.response import Response

# from . import serializers
# from .utils import get_and_authenticate_user

# User = get_user_model()

# class AutheViewSet(viewsets.GenericViewSet):
#     permission_classes = [AllowAny, ]
#     serializer_class = serializers.EmptySerializer
#     serializer_classes = {
#         'login': serializers.UserLoginSerializer,
#     }

#     @action(methods=['POST', ], detail=False)
#     def login(self, request):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = get_and_authenticate_user(**serializer.validated_data)
#         data = serializers.AuthUserSerializer(user).data
#         return Response(data=data, status=status.HTTP_200_OK)

#     def get_serializer_class(self):
#         if not isinstance(self.serializer_classes, dict):
#             raise ImproperlyConfigured("serializer_classes should be a dict mapping.")

#         if self.action in self.serializer_classes.keys():
#             return self.serializer_classes[self.action]
#         return super().get_serializer_class()