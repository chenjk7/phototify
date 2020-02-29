from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db.models.signals import post_save
from django.dispatch import receiver

def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'accounts/user_{0}/{1}'.format(instance.user.id, filename)

def validate_image(image):
    file_size = image.size
    limit_kb = 2500
    if file_size > limit_kb * 1024:
        raise ValidationError("Max size of file is %s KB" % limit_kb)

# Create your models here.
# class UserInformation (models.Model):
#     user = models.ForeignKey(User, related_name = 'user', unique=True, on_delete=models.CASCADE, null=True)    


class UserProfile (models.Model):
    user = models.OneToOneField(User, related_name = 'UserProfile', on_delete=models.CASCADE, null=True)    
    follow = models.ManyToManyField('self', related_name = 'follows', symmetrical=False,blank=True)
    picture = models.ImageField('Image',upload_to =user_directory_path,null=True,blank=True,validators=[validate_image])
    bgphoto = models.ImageField('Image',upload_to =user_directory_path,null=True,blank=True,validators=[validate_image])
    location = models.CharField(max_length=30, blank=True)
    follower_count = models.IntegerField(blank=True,null=True)
    following_count = models.IntegerField(blank=True,null=True)
    

    # @receiver(post_save, sender=User)
    # def create_user_profile(sender, instance, created, **kwargs):
    #     if created:
    #         print("======> ",instance)
    #         UserProfile.objects.create(user=instance)