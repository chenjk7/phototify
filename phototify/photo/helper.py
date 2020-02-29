import boto
from boto.s3.key import Key
from django.conf import settings
from django.core.files import File  
from PIL import Image

def s3_delete(id):
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
def uploadPhoto(instance,data):
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
    instance.save()
    