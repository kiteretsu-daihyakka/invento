from rest_framework.serializers import ModelSerializer
from .models import *

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        
class BusinessSerializer(ModelSerializer):
    class Meta:
        model = Business
        fields = '__all__'
