document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var options = {
        format: 'yyyy-mm-dd'
    };
    var instances = M.Datepicker.init(elems, options);
  });

var map = L.map('map').fitWorld();

var city;
var userLat;
var userLng;

var options = {
    key: 'c5540aeadb104afa8d407476d1928a32',
    limit: 5,
    expand: 'click',
    position: 'topright',
    onResultClick: function(result) {
      console.log(result);
      city = result.name;
      console.log(city);
      userLat = result.center.lat;
      userLng = result.center.lng;
      console.log(userLat);
      console.log(userLng);
      document.getElementById("location-text").value=city;
      assignValues(result.name, result.center.lat, result.center.lng);
    }
};




function assignValues(cityValue, latValue, lngValue) {
  city = cityValue;
  lat = latValue;
  lng = lngValue;  
  document.getElementById("location-text").value=city;
}

var control = L.Control.openCageSearch(options).addTo(map);

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
    
 L.marker(e.latlng).addTo(map)
        .bindPopup("You are here!")
        .openPopup();
    console.log(e.latlng);
        assignValues("Current Location", e.latlng.lat, e.latlng.lng);
}


map.on('locationfound', onLocationFound);









