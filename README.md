# La Cabaña Website

## Estructura del proyecto

```text
lacabana-website/
├── README.md
├── .gitignore
├── LICENSE
├── Procfile
├── railway.json
│
└── backend/
    ├── manage.py
    │
    ├── core/
    │   ├── settings.py
    │   ├── urls.py
    │   ├── wsgi.py
    │   └── asgi.py
    │
    ├── menu/
    │   ├── views.py
    │   ├── urls.py
    │   └── migrations/
    │
    ├── feedback/
    │   ├── views.py
    │   ├── urls.py
    │   └── migrations/
    │
    ├── templates/
    │   ├── pages/
    │   │   ├── inicio.html
    │   │   ├── menu.html
    │   │   ├── productos.html
    │   │   ├── servicio.html
    │   │   ├── puntos.html
    │   │   └── quejas.html
    │   │
    │   └── partials/
    │       └── header.html
    │
    └── static/
        ├── css/
        │   ├── header.css
        │   └── inicio.css
        │
        ├── js/
        │   └── inicio.js
        │
        ├── docs/
        │   ├── Menú.pdf
        │   ├── menu-pagina-1.png
        │   ├── menu-pagina-2.png
        │   ├── Fondo.png
        │   ├── Local.jpg
        │   ├── Qr.png
        │   ├── Qr scan.png
        │   └── Pizza.png
        │
        └── img/
            ├── logos/
            │   ├── logo-cabana.svg
            │   └── logo-principal.svg
            │
            ├── hero/
            │   ├── pizza.png
            │   ├── pasta.png
            │   ├── ensalada.png
            │   └── pizza-carne.jpg
            │
            ├── productos/
            │   ├── pizza-1.png
            │   ├── pizza-2.png
            │   ├── pizza-3.png
            │   ├── pasta-1.png
            │   └── ensalada-1.png
            │
            └── social/
                ├── facebook.svg
                ├── instagram.svg
                └── twitter.svg
```

```
cd C:\Users\Deft\Documents\lacabana-website\backend
.\venv\Scripts\Activate.ps1
$env:ALLOWED_HOSTS="*"
python manage.py runserver 127.0.0.1:8000
```

```
& "C:\Program Files (x86)\cloudflared\cloudflared.exe" tunnel --protocol http2 --url http://127.0.0.1:8000

```