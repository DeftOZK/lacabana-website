import logging
import re

from django.contrib import messages
from django.shortcuts import redirect, render

from .emailing import send_feedback_email
from .forms import FeedbackForm

logger = logging.getLogger(__name__)

URL_PATTERN = re.compile(r"(https?://|www\.|\b[a-z0-9.-]+\.(com|net|org|ru|xyz|top|site|online)\b)", re.IGNORECASE)
SPAM_TERMS = (
    "searchregister",
    "googlesearchindex",
    "google search index",
    "virtual assistant",
    "pricing options",
    "affordable rates",
    "seo service",
    "backlink",
    "casino",
    "crypto",
)


def is_spam_feedback(cleaned_data):
    text = " ".join(
        str(cleaned_data.get(field, ""))
        for field in ("nombre", "correo", "tipo", "mensaje")
    ).lower()

    if URL_PATTERN.search(text):
        return True

    return any(term in text for term in SPAM_TERMS)


def silently_accept_spam(request, reason):
    logger.warning("Feedback spam blocked: %s", reason)
    messages.success(request, "Gracias. Tu comentario fue enviado correctamente.")
    return redirect("feedback:home")


def feedback_home(request):
    if request.method == "POST":
        if request.POST.get("website"):
            return silently_accept_spam(request, "honeypot")

        form = FeedbackForm(request.POST, attachments=request.FILES.getlist("imagenes"))
        if form.is_valid():
            if is_spam_feedback(form.cleaned_data):
                return silently_accept_spam(request, "spam filter")

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
