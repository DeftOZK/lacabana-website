from django.shortcuts import render


def menu_home(request):
    return render(request, 'menu/home.html')
