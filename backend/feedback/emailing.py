import base64

import requests
from django.conf import settings
from django.core.mail import EmailMessage

from .forms import FeedbackForm


BREVO_API_URL = "https://api.brevo.com/v3/smtp/email"


def _build_feedback_message(cleaned_data):
    tipo_label = dict(FeedbackForm.TYPE_CHOICES).get(cleaned_data["tipo"], cleaned_data["tipo"])
    subject = f"Nuevo {tipo_label.lower()} desde lacabana.com"
    body = (
        "Se recibio un nuevo mensaje desde el formulario de comentarios.\n\n"
        f"Nombre: {cleaned_data['nombre']}\n"
        f"Correo: {cleaned_data['correo']}\n"
        f"Tipo: {tipo_label}\n\n"
        "Mensaje:\n"
        f"{cleaned_data['mensaje']}\n"
    )
    return subject, body


def _send_with_brevo_api(cleaned_data):
    subject, body = _build_feedback_message(cleaned_data)
    sender_email = getattr(settings, "BREVO_SENDER_EMAIL", "") or settings.DEFAULT_FROM_EMAIL
    sender_name = getattr(settings, "BREVO_SENDER_NAME", "") or "La Cabana"

    payload = {
        "sender": {"name": sender_name, "email": sender_email},
        "to": [{"email": settings.FEEDBACK_RECIPIENT_EMAIL}],
        "replyTo": {"email": cleaned_data["correo"], "name": cleaned_data["nombre"]},
        "subject": subject,
        "textContent": body,
    }

    attachments = []
    for image in cleaned_data.get("imagenes", []):
        image.seek(0)
        attachments.append(
            {
                "name": image.name,
                "content": base64.b64encode(image.read()).decode("ascii"),
            }
        )

    if attachments:
        payload["attachment"] = attachments

    response = requests.post(
        BREVO_API_URL,
        headers={
            "accept": "application/json",
            "api-key": settings.BREVO_API_KEY,
            "content-type": "application/json",
        },
        json=payload,
        timeout=getattr(settings, "EMAIL_TIMEOUT", 10),
    )
    response.raise_for_status()


def _send_with_smtp(cleaned_data):
    subject, body = _build_feedback_message(cleaned_data)
    email = EmailMessage(
        subject=subject,
        body=body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[settings.FEEDBACK_RECIPIENT_EMAIL],
        reply_to=[cleaned_data["correo"]],
    )

    for image in cleaned_data.get("imagenes", []):
        image.seek(0)
        email.attach(image.name, image.read(), getattr(image, "content_type", None))

    email.send(fail_silently=False)


def send_feedback_email(cleaned_data):
    if getattr(settings, "BREVO_API_KEY", ""):
        _send_with_brevo_api(cleaned_data)
    else:
        _send_with_smtp(cleaned_data)
