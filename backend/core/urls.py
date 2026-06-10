from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.views.generic import RedirectView

from menu import views as menu_views

urlpatterns = [
    path("", menu_views.home, name="home"),
    path("admin/", admin.site.urls),
    path("menu/", include("menu.urls")),
    path("cuenta/", menu_views.account, name="cuenta_home"),
    path("puntos/", menu_views.points, name="puntos_home"),
    path("productos/", menu_views.products, name="productos_home"),
    path("servicio/", menu_views.service, name="servicio_home"),
    path("comentarios/", include("feedback.urls")),
    path("quejas/", RedirectView.as_view(pattern_name="feedback:home", permanent=True)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
