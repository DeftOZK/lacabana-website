from django.shortcuts import render


def home(request):
    return render(request, "pages/inicio.html")


def menu_home(request):
    return render(request, "pages/menu.html")


def products(request):
    return render(request, "pages/productos.html")


def service(request):
    return render(request, "pages/servicio.html")


def points(request):
    return render(request, "pages/puntos.html")
