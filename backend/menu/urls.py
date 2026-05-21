from django.urls import path

from . import views

app_name = "menu"

urlpatterns = [
    path("", views.menu_home, name="home"),
    path("productos/", views.products, name="products"),
    path("servicio/", views.service, name="service"),
]
