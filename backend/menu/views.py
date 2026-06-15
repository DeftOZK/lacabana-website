from django.shortcuts import render


def home(request):
    return render(request, "pages/inicio.html")


def menu_home(request):
    try:
        return render(request, "pages/menu.html")
    except UnicodeDecodeError:
        return render(request, "pages/menu_respaldo.html")


def products(request):
    return render(request, "pages/productos.html")


def service(request):
    return render(request, "pages/servicio.html")


def points(request):
    return render(request, "pages/puntos.html")


def account(request):
    return render(request, "pages/cuenta.html")
