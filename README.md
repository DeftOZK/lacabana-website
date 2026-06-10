# La Cabaña Website

## Estructura del proyecto

```

```

---

## Instrucciones rápidas de desarrollo

### 1. Entrar a la carpeta del proyecto
```powershell
cd C:\Users\Deft\Documents\lacabana-website\backend

2. Activar el entorno virtual

.\venv\Scripts\Activate.ps1

3. Configurar variables de entorno

$env:ALLOWED_HOSTS="*"

4. Levantar servidor local

python manage.py runserver 127.0.0.1:8000

5. Crear un túnel para pruebas externas

& "C:\Program Files (x86)\cloudflared\cloudflared.exe" tunnel --protocol http2 --url http://127.0.0.1:8000

Esto genera un link temporal para que otros puedan acceder a la página mientras desarrollas.
```

### Manejo de ramas
```
Ver ramas locales

git branch

Crear nueva rama de desarrollo

git checkout -b feature/nombre-de-la-rama

Guardar cambios en la rama

git add .
git commit -m "Descripción de los cambios"
git push -u origin feature/nombre-de-la-rama

Cambiar a la rama principal

git checkout main
git stash push -m "Guardando cambios temporales"
git checkout main
```
