from django.urls import path
from . import views

app_name = 'puntos'

urlpatterns = [
    path('', views.puntos_home, name='home'),
]
