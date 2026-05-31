from django.shortcuts import render


def feedback_home(request):
    return render(request, "pages/quejas.html")
