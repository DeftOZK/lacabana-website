from django import forms


MAX_FEEDBACK_IMAGES = 5
MAX_FEEDBACK_IMAGE_SIZE = 5 * 1024 * 1024


class FeedbackForm(forms.Form):
    COMMENT = "comentario"
    SUGGESTION = "sugerencia"
    QUESTION = "duda"
    PRAISE = "felicitacion"

    TYPE_CHOICES = (
        (COMMENT, "Comentario"),
        (SUGGESTION, "Sugerencia"),
        (QUESTION, "Duda"),
        (PRAISE, "Felicitacion"),
    )

    nombre = forms.CharField(max_length=120, required=True)
    correo = forms.EmailField(required=True)
    tipo = forms.ChoiceField(choices=TYPE_CHOICES, required=True)
    mensaje = forms.CharField(required=True)

    def __init__(self, *args, attachments=None, **kwargs):
        super().__init__(*args, **kwargs)
        self.attachments = list(attachments or [])

    def clean_nombre(self):
        return self.cleaned_data["nombre"].strip()

    def clean_mensaje(self):
        return self.cleaned_data["mensaje"].strip()

    def clean(self):
        cleaned_data = super().clean()

        if len(self.attachments) > MAX_FEEDBACK_IMAGES:
            raise forms.ValidationError(f"Puedes adjuntar maximo {MAX_FEEDBACK_IMAGES} imagenes.")

        for image in self.attachments:
            if image.size > MAX_FEEDBACK_IMAGE_SIZE:
                raise forms.ValidationError(f"{image.name} supera el limite de 5MB.")

            content_type = getattr(image, "content_type", "") or ""
            if not content_type.startswith("image/"):
                raise forms.ValidationError(f"{image.name} no es una imagen valida.")

        cleaned_data["imagenes"] = self.attachments
        return cleaned_data
