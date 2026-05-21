# La Cabaña Website

Sistema web para restaurante con menú digital, clientes, sistema de puntos, feedback y panel administrativo.

## Stack

- Python
- Django
- PostgreSQL
- Railway
- WhiteNoise
- Gunicorn

## Estructura

```text
lacabana-website/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── core/
│   ├── menu/
│   ├── clientes/
│   ├── puntos/
│   ├── feedback/
│   ├── templates/
│   └── static/
├── docs/
├── .gitignore
├── Procfile
└── railway.json
```

## Ejecutar localmente en Windows PowerShell

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Abrir:

```text
http://127.0.0.1:8000/
```

Panel admin:

```text
http://127.0.0.1:8000/admin/
```

## Variables de entorno

Crear un archivo `backend/.env` basado en `backend/.env.example`.

## Módulos principales

- `menu`: categorías y productos del restaurante.
- `clientes`: perfil extendido de clientes.
- `puntos`: movimientos de puntos y recompensas.
- `feedback`: comentarios y calificaciones.
