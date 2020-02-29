from rest_framework import serializers, permissions
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import UserProfile
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    # follow= UserSerializer(many)
    class Meta:
        model = UserProfile
        fields = ['id','user','follow','picture','follower_count','following_count','location']

class UserSerializerGuest(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username']

class UserProfileSerializerGuest(serializers.ModelSerializer):
    user = UserSerializerGuest()
    # follow= UserSerializer(many)
    class Meta:
        model = UserProfile
        fields = ['id','user','picture']
    # def create (self, validated_data):
    #     print('validated_data',validated_data)
    #     user = User.objects.get(pk=validated_data['user'])
    #     FollowingUser = User.objects.get(pk=validated_data['follow'])
    #     print(user,FollowingUser)
    #     userprofile = UserProfile.objects.create(user,[FollowingUser])

    #     return userprofile

# User serial


#register
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email','password']
        extra_kwargs={'password':{'write_only':True }}
    
    def create (self, validated_data):
        user = User.objects.create_user(validated_data['username'],validated_data['email'],validated_data['password'])
        # UserProfile.objects.create(user=user) #create follow profile when a new user created
        return user

#login
class LoginSerializer(serializers.Serializer):

    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect credentials")