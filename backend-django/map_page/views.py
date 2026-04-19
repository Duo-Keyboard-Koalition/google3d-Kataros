from django.shortcuts import render
from django.conf import settings

def map_view(request):
    print(request.body)
    # Get parameters from the request, with default values
    lat = request.GET.get('lat', '37.841157')
    lng = request.GET.get('lng', '-122.551679')
    altitude = request.GET.get('altitude', '1000')
    heading = request.GET.get('heading', '0')
    tilt = request.GET.get('tilt', '0')
    range_value = request.GET.get('range', '2000')
    showLabels = request.GET.get('showLabels', 'true')
    print("showLabels: ", showLabels)
    context = {
        'lat': lat,
        'lng': lng,
        'altitude': altitude,
        'heading': heading,
        'tilt': tilt,
        'range': range_value,
        'my_location': "false",  # You can make this dynamic if needed
        'google_maps_api_key': settings.GOOGLE_MAPS_API_KEY,
        'aria_label': 'Kataros Map',
        'showLabels': showLabels,
    }
    return render(request, 'map_page/map_page.html', context)