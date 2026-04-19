"""
URL configuration for kataros project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.urls import path
from django.contrib.auth import views as auth_views
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView


class AuthHomeView(LoginRequiredMixin, TemplateView):
    template_name = 'auth_home.html'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', AuthHomeView.as_view(), name='home'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html', redirect_authenticated_user=True), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='/login/'), name='logout'),
]

if settings.SERVE_FRONTEND:
    urlpatterns += [
        # Serve the built frontend app in production from /app/.
        path('app/', TemplateView.as_view(template_name='index.html'), name='frontend-app'),
        path('app/<path:path>', TemplateView.as_view(template_name='index.html'), name='frontend-app-path'),
    ]