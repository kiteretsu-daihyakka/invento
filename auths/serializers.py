from rest_framework.serializers import ModelSerializer
from django.contrib.auth import get_user_model
# from rest_framework.authtoken.models import Token
from rest_framework import serializers

User = get_user_model()
print('type of user:',type(User))

# class UserLoginSerializer(serializers.Serializer):
#     username = serializers.CharField(max_length=300, required=True)
#     password = serializers.CharField(required=True, write_only=True)


class BusinessSerializer(ModelSerializer):
    # auth_token = serializers.SerializerMethodField()

    class Meta:
         model = User
         fields = ['name', 'username', 'password']
         
    def create(self, validated_data):
        user = User(
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    # def get_auth_token(self, obj):
    #     token = Token.objects.create(user=obj)
    #     return token.key

# class EmptySerializer(serializers.Serializer):
#     pass