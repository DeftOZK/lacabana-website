import logging

from django.contrib import messages
from django.shortcuts import redirect, render

from .emailing import send_feedback_email
from .forms import FeedbackForm

logger = logging.getLogger(__name__)


def feedback_home(request):
    if request.method == "POST":
        if request.POST.get("website"):
            logger.warning("Feedback honeypot triggered")
            messages.success(request, "Gracias. Tu comentario fue enviado correctamente.")
            return redirect("feedback:home")

        form = FeedbackForm(request.POST, attachments=request.FILES.getlist("imagenes"))
        if form.is_valid():
            try:
                send_feedback_email(form.cleaned_data)
            except Exception:
                logger.exception("Feedback email delivery failed")
                messages.error(
                    request,
                    "No pudimos enviar tu comentario en este momento. Intentalo de nuevo mas tarde.",
                )
            else:
                messages.success(request, "Gracias. Tu comentario fue enviado correctamente.")
            return redirect("feedback:home")
        else:
            messages.error(request, "Revisa los campos marcados antes de enviar tu comentario.")
    else:
        form = FeedbackForm(initial={"tipo": FeedbackForm.COMMENT})

    return render(request, "pages/comentarios.html", {"form": form})
