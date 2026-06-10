from django.conf import settings
from django.core.mail import EmailMessage

from .forms import FeedbackForm


def send_feedback_email(cleaned_data):
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
