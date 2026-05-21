from django.shortcuts import render

from .data import BUSINESS_INFO, FEATURED_DISHES, MENU_CATEGORIES, SERVICES


def base_context(**extra):
    context = {
        "business": BUSINESS_INFO,
        "featured_dishes": FEATURED_DISHES,
        "menu_categories": MENU_CATEGORIES,
        "services": SERVICES,
    }
    context.update(extra)
    return context


def home(request):
    return render(request, "menu/home.html", base_context(page_title="Inicio"))


def menu_home(request):
    return render(request, "menu/menu.html", base_context(page_title="Menú"))


def products(request):
    return render(request, "menu/products.html", base_context(page_title="Productos"))


def service(request):
    return render(request, "menu/service.html", base_context(page_title="Servicio"))
