import yaml
import os
import plotly.express as px
import pandas as pd
from django.shortcuts import render
from django.conf import settings
from sqlalchemy.testing.suite.test_reflection import users


def home_view(request):
    # Get the current user from the user model
    print(request.user)
    user = request.user
    data_dir = settings.DATA_DIR
    profile_pic_yaml = os.path.join(data_dir, 'profile_pictures.yaml')
    with open(profile_pic_yaml, 'r') as file:
        profile_pictures = yaml.safe_load(file)
    # Check if the user is authenticated and get the profile picture URL
    profile_pic_url = profile_pictures.get(str(user), None)

    print(profile_pic_url)
    context = {
        'title': 'Kataros | Home',
        'google_maps_api_key': settings.GOOGLE_MAPS_API_KEY,
        'description': 'Explore our interactive 3D map and discover the world around you.',
        'profile_pic_url': profile_pic_url,  # Pass the profile picture URL to the template
    }
    return render(request, 'home/home.html', context)
def socios(request):
    return render(request, 'home/socios.html')

def chart_view(request):
    # Example data for the chart
    df = pd.DataFrame({
        "Fruit": ["Apples", "Oranges", "Bananas"],
        "Amount": [10, 15, 7]
    })

    # Create a Plotly figure
    fig = px.bar(df, x="Fruit", y="Amount", title="Fruit Amounts")

    # Convert the figure to HTML
    graph_html = fig.to_html(full_html=False, include_plotlyjs='cdn')

    return render(request, 'home/charts.html', {'graph_html': graph_html})
def settings_page(request):
    return render(request, 'home/settings.html')
def profile(request):
    return render(request, 'home/profile.html')