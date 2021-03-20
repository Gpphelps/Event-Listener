var map = L.map("map2").fitWorld();

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZ3BwaGVscHMiLCJhIjoiY2ttN3Y3cmx5MTFuZzJ1czNmaGhmZ3B0YSJ9.zUETVN98ZHqjHjcUG8OFTg',
}).addTo(map);

map.locate({setView: true, maxZoom: 16});

function onLocationFound(e) {
    var radius = e.accuracy /2;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are here!")
        .openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);