document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var options = {
        format: 'yyyy-mm-dd'
    };
    var instances = M.Datepicker.init(elems, options);
  });

document.getElementById("search-btn").addEventListener("click", function() {
    var startDate
    localStorage.setItem("locLatLong", parsedLatLong);
    var startDate = document.getElementById("startDate").value;
    localStorage.setItem("startDate", startDate );
    window.location.assign("./results.html");
  });

var map = L.map('map').fitWorld();

var city;
var userLat;
var userLng;
var parsedLatLong;

var options = {
    key: 'c5540aeadb104afa8d407476d1928a32',
    limit: 5,
    expand: 'click',
    position: 'topright',
    onResultClick: function(result) {
      city = result.name;
      userLat = result.center.lat;
      userLng = result.center.lng;
      localStorage.setItem('originLat', userLat);
      localStorage.setItem('originLong', userLng);
      document.getElementById("location-text").value=city;
      assignValues(result.name, result.center.lat, result.center.lng);
      getLatLong();
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
      localStorage.setItem('originLat', e.latlng.lat);
      localStorage.setItem('originLong', e.latlng.lng);
      assignValues("Current Location", e.latlng.lat, e.latlng.lng);
}


map.on('locationfound', onLocationFound);


function getLatLong() {
  var latString = localStorage.getItem('originLat');
  var longString = localStorage.getItem('originLong');
  var newLatString;
  var newLongString;

  if (latString.startsWith('-')) {
    newLatString = latString.substr(0,9);
  } else {
    newLatString = latString.substr(0,8);
  };

  if (longString.startsWith('-')) {
    newLongString = longString.substr(0,9);
  } else {
    newLongString = longString.substr(0,8);
  };

  parsedLatLong = `${newLatString},${newLongString}`
}





