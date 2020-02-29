from rest_framework import generics, permissions, viewsets,status
from rest_framework.response import Response
from knox.models import AuthToken
from rest_framework.views import APIView
from .serializers import UserSerializer, RegisterSerializer,LoginSerializer,UserProfileSerializer
from rest_framework.decorators import  permission_classes
from .models import UserProfile
from django.contrib.auth.models import User
from rest_framework.decorators import  permission_classes,action
from django.core.files.storage import default_storage
import boto
from boto.s3.key import Key
from django.conf import settings
from django.core.files import File  
from PIL import Image
import sys
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile

class UserProfileAPI(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class= UserProfileSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def s3_delete(self,id):
        if id:
            s3conn = boto.connect_s3(settings.AWS_ACCESS_KEY_ID,
                    settings.AWS_SECRET_ACCESS_KEY)
            bucket = s3conn.get_bucket(settings.AWS_STORAGE_BUCKET_NAME)
            print(id)
            k = Key(bucket)
            k.key = str(id)
            output = k.delete()
            print(settings.DEFAULT_FILE_STORAGE)
            return True
        return False
    def uploadPhoto(self,instance,data):
        instance.picture=data['picture']            
        im = Image.open(instance.picture)
        output = BytesIO()
        #Resize/modify the image
        im = im.resize( (200,200) )
        #after modifications, save it to the output
        im.save(output, format='JPEG', quality=100)
        output.seek(0)
        #change the imagefield value to be the newley modifed image value
        instance.picture = InMemoryUploadedFile(output,'ImageField', "%s.jpg" %instance.picture.name.split('.')[0], 'image/jpeg', sys.getsizeof(output), None)
        print ("instance.picture")
        instance.save()
        
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        data=request.data
        if request.user.pk != int(kwargs['pk']):
            return Response ("Wrong user",status=status.HTTP_403_FORBIDDEN)
        # user = self.request.user
        if request.method == 'PUT':
            if 'follow' in data:

                if instance.follow.all().filter(pk=data['follow']):
                    FollowingUser = User.objects.get(pk=data['follow'])
                    instance.follow.remove(FollowingUser.pk)
                else:
                    FollowingUser = User.objects.get(pk=data['follow'])
                    instance.follow.add(FollowingUser.id)
                instance.following_count = len(instance.follow.all())
                instance.save()

            if 'picture' in data:
                # if settings.DEFAULT_FILE_STORAGE ==  "storages.backends.s3boto3.S3Boto3Storage":
                if settings.DEFAULT_FILE_STORAGE ==  "storages.backends.s3boto3.S3Boto3Storage":
                    print(instance.picture)
                    if instance.picture == '': 
                        self.uploadPhoto(instance,data)
                    else:
                        s3_file_deleted = self.s3_delete(instance.picture)
                        if s3_file_deleted:
                            self.uploadPhoto(instance,data)                        
                else: 
                    instance.picture.delete()
                    self.uploadPhoto(instance,data)           
                # except:
                #     pass
                # return Response("Profile photo upload fail",status=status.HTTP_204_NO_CONTENT)
                

                # img = Image.open(instance.picture)
                # if img.height > 300 or img.width > 300:
                #     output_size = (300,300)
                #     img.thumbnail(output_size)
                #     # img.save(instance.picture)
                #     # print(img)
                #     instance.picture = File( img.thumbnail(output_size),'asd')
                #     print(instance.picture)
        serializer = self.get_serializer_class()(instance)
        return Response(serializer.data,status=status.HTTP_200_OK)

    # @action(methods=['GET'],detail=True)
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # instance = self.get_queryset().filter(user=request.user).first()
        pk = request.user.pk
        instance.following_count = len(instance.follow.all())
        followers = UserProfile.objects.all().filter(follow=pk)
        instance.follower_count = len(followers)
        instance.save()
        serializer =  self.get_serializer_class()(instance,context={'request': request})

        # serializer.is_valid(raise_exception =True)
        return  Response (serializer.data, status=200)

    @action(methods=['get'],detail=True)
    def getFollowers(self, request, pk=None, *args, **kwargs):
        pk = request.user.pk
        print(pk)
        up = UserProfile.objects.all().filter(follow=pk)
        # serializer = UserSerializer(up.first().user)
        serializer =  self.get_serializer_class()(up,many=True,context={'request': request})
        print(serializer.data)
        return  Response (serializer.data, status=200)
    
    @action(methods=['get'],detail=True)
    def getFollowings(self, request,pk=None, *args, **kwargs):
        instance = self.get_object()
        followings = instance.follow.all()
        serializer =  self.get_serializer_class()(followings,many=True,context={'request': request})

        
        # userList = []
        # a = instance.follow.get_queryset()

        # for i in a:
        #     for field in i:
        #         print (field)
        # # return names

        return  Response (serializer.data, status=200)
    # def create(self, request, *args, **kwargs):
    #     print(request.data)
    #     # serializer = self.get_serializer(data=request.data)
    #     # serializer.is_valid(raise_exception = True)
    #     # serializer.save()
        
    #     data=request.data
    #     user = self.request.user
    #     FollowingUser = User.objects.get(pk=data['follow'])
    #     UserProfile.
    #     print(user,FollowingUser)
    #     # UserProfileSerializer.save(self,user=user,follow=FollowingUser)
    #     serializer =  self.get_serializer_class()(data={"user":data['user']})
    #     serializer.follow.add(FollowingUsers)
    #     serializer.is_valid(raise_exception=True)

    #     if serializer.is_valid:
    #         return Response(serializer.data, status = 200)
    #     return Response(serializer.errors,status = 400) 
    #     instance = self.get_object()
    #     print(instance)
        # serializer = self.get_serializer(instance)
        # data = serializer.data
        # data  

     

#register api
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    
    def post(self,request,*args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.save()

        # userProfileSerializer = UserProfileSerializer(user=user)
        # userProfileSerializer.is_valid(raise_exception = True)
        # userProfileSerializer.save()

        return Response({
            "user": UserSerializer(user).data,
            "token": AuthToken.objects.create(user)[1]
        })

#login api
class LoginAPI(generics.GenericAPIView):

    serializer_class =  LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data= request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user":  UserProfileSerializer(user.UserProfile,context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })
#get user api
class isUserTokenValid(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def get(self, request):        
        return Response(True)
class getUserByUsername(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def get(self, request):        
        # update the followers/follows
        if 'username' not in self.request.query_params:
             return Response('error username ', status=status.HTTP_204_NO_CONTENT)
        username = self.request.query_params['username']
        user= User.objects.get(username=username)
        # get the updated following/follower counts
        instance = user.UserProfile
        pk = user.pk
        instance.following_count = len(instance.follow.all())
        followers = UserProfile.objects.all().filter(follow=pk)
        instance.follower_count = len(followers)
        instance.save()

        return Response(
            UserProfileSerializer(user.UserProfile).data
        )
class UserAPI(generics.RetrieveAPIView):

    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserProfileSerializer
    
    def get_object(self):
        return self.request.user.UserProfile

    # def retrieve(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance)
    #     return Response(serializer.data)
    @action(methods=['get'],detail=True)
    def isTokenValid(self, request, pk=None, *args, **kwargs):
        print(self.request)
        return Response ('True')