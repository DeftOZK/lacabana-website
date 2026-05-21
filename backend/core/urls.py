from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import HttpResponse
from django.urls import path


def home(request):
    return HttpResponse('La Cabana Website - inicio')


def menu(request):
    return HttpResponse('Menu digital')


def clientes(request):
    return HttpResponse('Clientes')


def puntos(request):
    return HttpResponse('Sistema de puntos')


def feedback(request):
    return HttpResponse('Feedback')


urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),
    path('menu/', menu, name='menu_home'),
    path('clientes/', clientes, name='clientes_home'),
    path('puntos/', puntos, name='puntos_home'),
    path('feedback/', feedback, name='feedback_home'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
