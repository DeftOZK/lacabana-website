from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from menu import views as menu_views

urlpatterns = [
    path("", menu_views.home, name="home"),
    path("admin/", admin.site.urls),
    path("menu/", include("menu.urls")),
    path("puntos/", menu_views.points, name="puntos_home"),
    path("productos/", menu_views.products, name="productos_home"),
    path("servicio/", menu_views.service, name="servicio_home"),
    path("quejas/", include("feedback.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
