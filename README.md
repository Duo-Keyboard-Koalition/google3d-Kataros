# ice-django

This repo uses Django for backend and static hosting, and Ice for frontend.

## Frontend Modes

- Development: run Ice dev server and proxy Django routes through Ice.
- Production: build Ice and let Django serve the built files.

## Development

1. Start Django:

   - `cd backend-django`
   - `python manage.py runserver`

2. Start Ice frontend:

   - `cd frontend-ice`
   - `npm install`
   - `npm start`

3. Open the Ice dev URL shown in terminal (usually http://localhost:3333).

The Ice config proxies backend paths like `/admin`, `/maps`, `/login`, `/logout`, `/media`, and `/static` to Django.

## Production Build and Serve Through Django

1. Build Ice frontend:

   - `cd frontend-ice`
   - `npm install`
   - `npm run build`

2. Ice build output goes to:

   - `backend-django/frontend_dist`

3. Run Django in production mode and collect static files:

   - `cd backend-django`
   - `python manage.py collectstatic --noinput`

4. Django serves the frontend app at:

   - `/app/`

## Notes

- Django route wiring for built frontend is in `backend-django/kataros/urls.py`.
- Frontend output/proxy config is in `frontend-ice/ice.config.mts`.
- There is no Vite app at repository root anymore.
