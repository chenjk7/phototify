from rest_framework import serializers, permissions
from django.contrib.auth.models import User
from .models import Photo, PhotoComment
from accounts.serializers import UserProfileSerializerGuest
from datetime import datetime

def decode_base64(data, altchars=b'+/'):
    import base64
    import re
    """Decode base64, padding being optional.

    :param data: Base64 data as an ASCII byte string
    :returns: The decoded byte string.

    """
    data = re.sub(rb'[^a-zA-Z0-9%s]+' % altchars, b'', data)  # normalize
    missing_padding = len(data) % 4
    if missing_padding:
        data += b'='* (4 - missing_padding)
    return base64.b64decode(data, altchars)
class Base64ImageField(serializers.ImageField):
    """
    A Django REST framework field for handling image-uploads through raw post data.
    It uses base64 for encoding and decoding the contents of the file.

    Heavily based on
    https://github.com/tomchristie/django-rest-framework/pull/1268

    Updated for Django REST framework 3.
    """
    


    def to_internal_value(self, data):
        from django.core.files.base import ContentFile
        import base64
        import six
        import uuid

        # Check if this is a base64 string
        if isinstance(data, six.string_types):
            # Check if the base64 string is in the "data:" format
            if 'data:' in data and ';base64,' in data:
                # Break out the header from the base64 content
                header, data = data.split(';base64,')

            # Try to decode the file. Return validation error if it fails.
            try:
                decoded_file = decode_base64(data)
            except TypeError:
                self.fail('invalid_image')

            # Generate file name:
            file_name = str(uuid.uuid4())[:12] # 12 characters are more than enough.
            # Get the file name extension:
            file_extension = self.get_file_extension(file_name, decoded_file)

            complete_file_name = "%s.%s" % (file_name, file_extension, )

            data = ContentFile(decoded_file, name=complete_file_name)

        return super(Base64ImageField, self).to_internal_value(data)

    def get_file_extension(self, file_name, decoded_file):
        import imghdr

        extension = imghdr.what(file_name, decoded_file)
        extension = "jpg" if extension == "jpeg" else extension

        return extension

class photoSerializer(serializers.ModelSerializer):

    owner = UserProfileSerializerGuest()
    class Meta: 
        model = Photo
        fields = ['id','owner','name','description','view','photo','created_at']
    

class photoSerializerPOST(serializers.ModelSerializer):
    # photo = Base64ImageField(
    #     max_length=None, use_url=True,
    # )
    
    class Meta: 
        model = Photo
        fields = ['id','owner','name','description','view','photo','created_at']
  
    # def create(self, validated_data):
        
    #     created_at = datetime.now()

    #     validated_data['created_at'] = created_at
    #     print(validated_data)
    #     try:
    #         obj = Photo.objects.create(**validated_data)
    #     except TypeError as exc:
    #         raise TypeError('create fail')
    #     return obj
class PhotoCommentSerializerPOST(serializers.ModelSerializer):
    # user = UserProfileSerializerGuest()
    class Meta: 
        model = PhotoComment
        fields = ['id','photoId','comment','user','date_created']

class PhotoCommentSerializerGET(serializers.ModelSerializer):
    user = UserProfileSerializerGuest()
    class Meta: 
        model = PhotoComment
        fields = ['id','photoId','comment','user','date_created']