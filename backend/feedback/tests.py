from django.core import mail
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, override_settings


@override_settings(
    EMAIL_BACKEND="django.core.mail.backends.locmem.EmailBackend",
    DEFAULT_FROM_EMAIL="web@lacabana.test",
    FEEDBACK_RECIPIENT_EMAIL="soporte@lacabana.test",
)
class FeedbackFormTests(TestCase):
    def valid_data(self):
        return {
            "nombre": "Ana",
            "correo": "ana@example.com",
            "tipo": "duda",
            "mensaje": "El pedido llego incompleto.",
        }

    def image(self, name="ticket.jpg", size=32):
        return SimpleUploadedFile(name, b"x" * size, content_type="image/jpeg")

    def test_feedback_form_sends_email_with_attachment(self):
        response = self.client.post(
            "/comentarios/",
            data={**self.valid_data(), "imagenes": [self.image()]},
        )

        self.assertRedirects(response, "/comentarios/")
        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].to, ["soporte@lacabana.test"])
        self.assertEqual(mail.outbox[0].reply_to, ["ana@example.com"])
        self.assertEqual(len(mail.outbox[0].attachments), 1)

    def test_feedback_form_rejects_invalid_email(self):
        data = self.valid_data()
        data["correo"] = "correo-invalido"

        response = self.client.post("/comentarios/", data=data)

        self.assertContains(response, "Revisa los campos", status_code=200)
        self.assertEqual(len(mail.outbox), 0)

    def test_feedback_form_rejects_more_than_five_images(self):
        images = [self.image(f"foto-{index}.jpg") for index in range(6)]

        response = self.client.post(
            "/comentarios/",
            data={**self.valid_data(), "imagenes": images},
        )

        self.assertContains(response, "maximo 5 imagenes", status_code=200)
        self.assertEqual(len(mail.outbox), 0)

    def test_feedback_form_rejects_images_larger_than_5mb(self):
        large_image = self.image(size=(5 * 1024 * 1024) + 1)

        response = self.client.post(
            "/comentarios/",
            data={**self.valid_data(), "imagenes": [large_image]},
        )

        self.assertContains(response, "supera el limite de 5MB", status_code=200)
        self.assertEqual(len(mail.outbox), 0)
