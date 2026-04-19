// Get the script element
const script = document.currentScript;

// Get the value of the data-home-url attribute
const homeUrl = script.getAttribute('data-home-url');

// Now you can use homeUrl in your redirectToMapWithLocation function
function redirectToMapWithLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const alt = 1000; // Default altitude
            const heading = 0; // Default heading
            const tilt = 0; // Default tilt
            const range = 100; // Default range

            // Construct the URL with parameters
            const params = new URLSearchParams({
                lat: lat,
                lng: lng,
                alt: alt,
                heading: heading,
                tilt: tilt,
                range: range
            });

            // Redirect to the constructed URL
            window.location.href = `${homeUrl}?${params.toString()}`;
        }, function(error) {
            console.error("Error getting location:", error);
            // Redirect to default map view if location is not available
            window.location.href = homeUrl;
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
        // Redirect to default map view if geolocation is not supported
        window.location.href = homeUrl;
    }
}