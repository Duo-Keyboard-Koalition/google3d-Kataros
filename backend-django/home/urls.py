from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('socios/', views.socios, name='socios'),
    path('charts/', views.chart_view, name='charts'),
    path('settings/', views.settings_page, name = 'settings'),
    path('profile/', views.profile, name='profile'),
]