from django.urls import path, include
from .api import RegisterAPI,LoginAPI,UserAPI,UserProfileAPI,isUserTokenValid,getUserByUsername
from knox import views as knox_views    
from rest_framework import routers

Router = routers.DefaultRouter()
Router.register('api/userprofile',UserProfileAPI)

urlpatterns = [
    path('',include(Router.urls)),
    path('api/auth/login/',LoginAPI.as_view()),
    path('api/auth/user/',UserAPI.as_view()),
    path('api/auth/isUserTokenValid/',isUserTokenValid.as_view()),
    path('api/auth/getUserByUsername/',getUserByUsername.as_view()),
    path('api/auth/register/',RegisterAPI.as_view()),
    path('api/auth/logout/', knox_views.LogoutView.as_view(),name="knox_logout"),
    path('api/auth/',include('knox.urls')),       
]
