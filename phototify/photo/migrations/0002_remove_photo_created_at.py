# Generated by Django 3.0.2 on 2020-01-22 21:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('photo', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='photo',
            name='created_at',
        ),
    ]
