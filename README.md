# ice-django

This repo uses Django for backend and static hosting, and Ice for frontend.

The Django app is intentionally minimal and uses native Django authentication only:

- Login
- Logout

## Frontend Modes

- Development: run Ice dev server and proxy Django routes through Ice.
- Production: build Ice and let Django serve the built files.

## Development

1. Start Django:

   - `cd backend-django`
   - `uv run --with-requirements requirements.app.txt python manage.py runserver`

2. Start Ice frontend:

   - `cd frontend-ice`
   - `npm install`
   - `npm start`

3. Open the Ice dev URL shown in terminal (usually http://localhost:3333).

The Ice config proxies backend paths like `/admin`, `/login`, `/logout`, and `/static` to Django.

## Production Build and Serve Through Django

1. Build Ice frontend:

   - `cd frontend-ice`
   - `npm install`
   - `npm run build`

2. Ice build output goes to:

   - `backend-django/frontend_dist`

3. Run Django in production mode and collect static files:

   - `cd backend-django`
   - `uv run --with-requirements requirements.app.txt python manage.py collectstatic --noinput`

4. Django serves the frontend app at:

   - `/app/`

5. Django auth routes:

   - Login: `/login/`
   - Logout: `/logout/`
   - Auth home (requires login): `/`

## One-Command Production Run (PowerShell)

From the repository root:

- `./run-production.ps1`

Optional parameters:

- `./run-production.ps1 -HostAddress 0.0.0.0 -Port 8000 -AllowedHosts "127.0.0.1,localhost"`

This script does all production steps:

- Installs frontend dependencies
- Builds Ice frontend
- Sets Django production environment variables
- Runs migrations with `uv`
- Runs collectstatic with `uv`
- Starts Django server with `uv`

## Notes

- Django route wiring for built frontend is in `backend-django/kataros/urls.py`.
- Frontend output/proxy config is in `frontend-ice/ice.config.mts`.
- There is no Vite app at repository root anymore.
