# Generated by Django 3.0.2 on 2020-02-27 21:11

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '__first__'),
        ('photo', '0003_photo_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photocomment',
            name='date_created',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='photocomment',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='accounts.UserProfile'),
        ),
    ]
