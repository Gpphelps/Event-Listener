document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var options = {
        format: 'yyyy-mm-dd'
    };
    var instances = M.Datepicker.init(elems, options);
  });

document.getElementById("search-btn").addEventListener("click", function() {
    var startDate
    /*If the user presses the search button without providing a date, default to the current date.
      Write all data to local storage, then open the results.html page.*/
    if(document.getElementById("startDate").value !== "") {
      localStorage.setItem("locLatLong", parsedLatLong);
      var startDate = document.getElementById("startDate").value;
      localStorage.setItem("startDate", startDate );
      window.location.assign("./results.html");
    } else {
      var today = new Date().toISOString().slice(0, 10)
      document.getElementById("startDate").value = today;
      localStorage.setItem("startDate", today );
      window.location.assign("./results.html");
    };
  });

// creates the map inside the element with the id=map
var map = L.map('map').fitWorld();

// variables used for storing the latitude and longitude in local storage
var city;
var userLat;
var userLng;
var parsedLatLong;

// assigns the values for the OpenCage search bar
var options = {
    key: 'c5540aeadb104afa8d407476d1928a32',
    limit: 5,
    expand: 'click',
    position: 'topright',
    // on click of a location in the search bar runs function to get retrieve the Lat and Long of a marker created with the OpenCage search bar and stores that data to local storage, and runs the assignValues function. 
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

// assigns the users chosen location to the given input fields
function assignValues(cityValue, latValue, lngValue) {
  city = cityValue;
  lat = latValue;
  lng = lngValue;  
  document.getElementById("location-text").value=city;
}
// creates the map inside the element with the id=map
var control = L.Control.openCageSearch(options).addTo(map);
// applies the map layer to the map element 
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZ3BwaGVscHMiLCJhIjoiY2ttN3Y3cmx5MTFuZzJ1czNmaGhmZ3B0YSJ9.zUETVN98ZHqjHjcUG8OFTg',
}).addTo(map);

// asks the user for their location and sets the max zoom to 16
map.locate({setView: true, maxZoom: 16});

// if the user accepts the use of their location this function runs e is an interchangeable variable
function onLocationFound(e) {

  // creates a marker at the users current location and sets the the lat and long of that point to local storage, also runs the getUserLatLong() function to set the locLatLong to local storage for use by the TicketMaster Discovery API 
 L.marker(e.latlng).addTo(map)
        .bindPopup("You are here!")
        .openPopup();
      localStorage.setItem('originLat', e.latlng.lat);
      localStorage.setItem('originLong', e.latlng.lng);
      assignValues("Current Location", e.latlng.lat, e.latlng.lng);
      getUserLatLong();      
}

// function that checks the lat or the long to see if it starts with a negative and parses the appropriate ammont of digits from the end of the origional lat and long to make it accepted by the Discovery API


/*This function parses the latitide and longitude provided by our map so that it meets the Ticketmaster API required latitude and longitude format*/

function getUserLatLong() {
      lat = localStorage.getItem('originLat');
      long = localStorage.getItem('originLong');
      var userLatString;
      var userLongString;
      if (lat.startsWith('-')) {
        userLatString = lat.substr(0,9);
      } else {
        userLatString = lat.substr(0,8);
      };
    
      if (long.startsWith('-')) {
        userLongString = long.substr(0,9);
      } else {
        userLongString = long.substr(0,8);
      }
      parsedLatLong = `${userLatString},${userLongString}`
      localStorage.setItem('locLatLong', parsedLatLong);
}

// runs the onLocationFound function when the location is detected as found
map.on('locationfound', onLocationFound);

// performs the same function as the getUserLatLong function, but it dosent set anything to local storage
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





