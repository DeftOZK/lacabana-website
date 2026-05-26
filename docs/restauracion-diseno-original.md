# Restauración del diseño original

Esta corrección restaura el diseño visual del prototipo `LaCabanaRestaurante-main.zip`.

## Qué se corrigió

- Se reemplazaron las plantillas oscuras provisionales por el HTML original adaptado a Django.
- Se copiaron los CSS originales a `backend/static/css/`.
- Se copiaron los JS originales a `backend/static/js/`.
- Se copiaron las imágenes reales del prototipo a `backend/static/images/`.
- Se actualizaron rutas HTML a rutas Django (`{% url %}`) y assets a `{% static %}`.

## Nota técnica

El slider de la página principal usa Swiper en JavaScript porque es comportamiento visual del navegador. No conviene traducir esa parte a Python. La lógica que sí debe pasar a Python/Django en la siguiente fase es la administración del menú, productos, precios, clientes y pedidos mediante modelos y base de datos.
