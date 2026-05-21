# Importación del prototipo estático

Se revisó el ZIP `LaCabanaRestaurante-main.zip` y se identificaron archivos HTML, CSS, JS e imágenes del prototipo.

## Conversión realizada

- HTML repetido → `backend/templates/base.html`.
- Página principal → `backend/templates/menu/home.html`.
- Menú → `backend/templates/menu/menu.html`.
- Productos → `backend/templates/menu/products.html`.
- Servicio → `backend/templates/menu/service.html`.
- CSS unificado → `backend/static/css/site.css`.
- Datos del menú y tarjetas → `backend/menu/data.py`.
- Rutas Django → `backend/core/urls.py` y `backend/menu/urls.py`.

## Sobre JavaScript

El único JavaScript con lógica útil era `PrimerProyecto.js`, que inicializaba sliders de Swiper. Para esta primera migración se reemplazó por renderizado responsivo desde Python/Django. Los archivos `PagMenu.js`, `Productos.js` y `Servicio.js` estaban vacíos.

## Siguiente mejora recomendada

Migrar `MENU_CATEGORIES` a modelos reales de Django para administrar categorías, productos y precios desde `/admin/` con PostgreSQL.
