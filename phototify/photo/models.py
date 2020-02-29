from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from taggit.managers import TaggableManager
from accounts.models import UserProfile

from django.utils import timezone
# Create your models here.
def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'photo/user_{0}/{1}/'.format(instance.owner.id, filename)

def validate_image(image):
    file_size = image.size
    limit_kb = 2500
    if file_size > limit_kb * 1024:
        raise ValidationError("Max size of file is %s KB" % limit_kb)


class Photo(models.Model):
    owner = models.ForeignKey(UserProfile, related_name = 'photos', on_delete=models.CASCADE, null=True)    
    name = models.CharField(max_length=100, blank=True, null=True)
    description = models.CharField(max_length=150, blank=True, null=True)
    view = models.IntegerField(default=0)
    photo = models.ImageField('Image',upload_to =user_directory_path,null=True,blank=True,validators=[validate_image])
    created_at = models.DateTimeField(default=timezone.now)
    # tags = TaggableManager()

class PhotoComment (models.Model):
    photoId = models.ForeignKey(Photo, related_name ="photocomments",on_delete=models.CASCADE,null=True)
    comment = models.CharField(max_length=150)
    user=models.ForeignKey(UserProfile, on_delete=models.CASCADE,null=True,blank=True)
    date_created = models.DateTimeField(default=timezone.now)