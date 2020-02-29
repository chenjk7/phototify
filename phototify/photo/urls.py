from django.urls import path, include
from rest_framework import routers
from . import api
Router = routers.DefaultRouter()
Router.register('photo',api.photoAPI)
Router.register('photoComment',api.photoCommentAPI)


urlpatterns = [
    path('api/',include(Router.urls)),
]