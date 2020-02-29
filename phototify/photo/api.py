from rest_framework import permissions, viewsets,status, generics
from rest_framework.response import Response
from rest_framework.decorators import action,permission_classes
from django.contrib.auth.models import User
from .models import Photo, PhotoComment
from .serializer import photoSerializer,photoSerializerPOST,PhotoCommentSerializerPOST,PhotoCommentSerializerGET
from .helper import s3_delete
from accounts.models import UserProfile
from accounts.serializers import UserProfileSerializerGuest,UserSerializer
from django.conf import settings
from datetime import datetime
from django.utils import timezone
import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS
from django.core.files import File
import urllib.request as urllib_request
from PIL import Image

class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS

class photoCommentAPI(viewsets.ModelViewSet):
    queryset = PhotoComment.objects.all()
    serializer_class = PhotoCommentSerializerPOST
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return PhotoCommentSerializerGET
        return PhotoCommentSerializerPOST
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        profile = self.request.user.UserProfile
        profileSerializer = UserProfileSerializerGuest (profile)
        data = serializer.data
        data ['user']=profileSerializer.data
        print(data)

        return Response(data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user.UserProfile)

    def list(self, request, *args, **kwargs):
        if 'photoId' not in self.request.query_params:
            return Response('error photoId ', status=status.HTTP_204_NO_CONTENT)
        photoId = self.request.query_params['photoId']

        queryset = self.get_queryset().filter(photoId=photoId).order_by('-id')
        serializer = self.get_serializer(queryset, many=True)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class photoAPI(viewsets.ModelViewSet):
    queryset = Photo.objects.all() 

    permission_classes = [
        permissions.IsAuthenticated,
    ]
    # def instance = self.get_object()
    #     serializer = self.get_serializer(instance)
    #     return Response(serializer.data)
    def get_response_data(self,paginated_queryset):
        data={}
        for photo in paginated_queryset:
            data = {
                'id': photo.id,
                'owner': photo.owner,
                'name': photo.name,
                'description': photo.description,
                'photo': photo.photo,
                'created_at':  photo.created_at
                } 
            
        return data
        
    @action(methods=['get'],detail=True) 
    def getPhotoCommentlists(self, request, *args, **kwargs):

        instance = self.get_object()
        serializer = PhotoCommentSerializerGET(instance.photocomments.all(), many=True)
        return Response(serializer.data)

    @action(methods=['get'],detail=False) 
    def getUserPhotos(self, request, *args, **kwargs):
        if 'userId' not in self.request.query_params:
            return Response('error userId ', status=status.HTTP_204_NO_CONTENT)
        userId = self.request.query_params['userId']
        user = User.objects.get(pk=userId)
        userfeeds=[]
        if user.UserProfile.photos.all():
                userfeeds=user.UserProfile.photos.all().order_by('-id')
        page = self.paginate_queryset(userfeeds)
        if page is not None:
            serializer = self.get_serializer_class()(page,many=True,context={'request': request})
            # data = self.get_response_data(serializer.data)
            # data = self.get_response_data(page)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer_class()(userfeeds,many=True,context={'request': request})
        # data = self.get_response_data(serializer.data)


        return Response( serializer.data)

    @action(methods=['get'],detail=False) 
    def getFollowingsLatestPhoto(self, request, *args, **kwargs):
        # instance = self.get_object()
        # instance = self.get_queryset().filter(owner=request.user.UserProfile)
        # if not instance:
        #     return Response({})
        print('get comm')
        followings = request.user.UserProfile.follow.all()
        latestFeeds = []
        for following in followings:
            user = User.objects.get(username=following.user)

            if user.UserProfile.photos.all():
                latestFeeds.append(user.UserProfile.photos.all().latest('id'))
              
        # serializer = self.get_serializer_class()(latestFeeds,many=True,context={'request': request})
        # return Response(serializer.data)
        
     
        page = self.paginate_queryset(latestFeeds)
        if page is not None:
            serializer = self.get_serializer_class()(page,many=True,context={'request': request})
            # data = self.get_response_data(serializer.data)
            # data = self.get_response_data(page)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer_class()(latestFeeds,many=True,context={'request': request})
        # data = self.get_response_data(serializer.data)
        return Response( serializer.data)



    def get_queryset(self):
        MyPhoto = Photo.objects.all().filter(owner = self.request.user.UserProfile)

        return MyPhoto
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return photoSerializer
        return photoSerializerPOST
    

    def create(self, request, *args, **kwargs):
        # serializer_class = photoSerializerPOST
        # if str(self.request.user.id )!= request.data['owner']:
        #     return Response('Owner id not right', status=status.HTTP_403_FORBIDDEN)
        user = User.objects.get(pk=self.request.user.id )
        userprofile = UserProfile.objects.get(user=user)
        

        # userdata = UserProfileSerializer(userprofile)
        request.data['owner'] = userprofile.id
       
      
        print(request.data['photo'])
        # request.data['created_at']  =timezone.now
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        self.perform_create(serializer)
        # serializer.save()
        print(serializer.data)
        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def destroy(self, request, *args, **kwargs):
        # try:
        instance = self.get_object()
        # print('=====>',default_storage (instance.picture))
        # default_storage.delete(str(instance.picture))
        if settings.DEFAULT_FILE_STORAGE ==  "storages.backends.s3boto3.S3Boto3Storage":
            s3_file_deleted = s3_delete(instance.photo)
            if s3_file_deleted:
                self.perform_destroy(instance)
                return Response(status=status.HTTP_200_OK)
        else: 
            instance.picture.delete()
            self.perform_destroy(instance)
        return Response(status=status.HTTP_200_OK)
        # except:
        #     pass
        return Response(status=status.HTTP_204_NO_CONTENT)