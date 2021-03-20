var map = L.map("map2").fitWorld();
var startDate= localStorage.GetItem("startDate"); /*2021-03-17"*/
var locLatLong= localStorage.GetItem("locLatLong"); /*36.05452,-80.27807"*/
var originLat = localStorage.GetItem("originLat");
var originLong = localStorage.GetItem("originLong");
var tblResults = document.querySelector('#results');

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
};

map.on('locationfound', onLocationFound);

function findEvents() {
      var strQuery = "https://app.ticketmaster.com/discovery/v2/events.json?latlong=" + locLatLong + "&sort=date%2Casc&unit=miles&radius=100&tab=events&startDateTime=" + startDate + "T00:00:00Z&apikey=r6SGj0AX62Qeuo5HGhQmP6lEqmuH9LBy"
      console.log(strQuery);
      
      fetch(strQuery)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var tblFirstRow
        var tblSecondRow
        var tblThirdRow
        var tblFirstColumn
        var tblSecondColumnFirstRow
        var tblSecondColumnSecondRow 
        var tblSecondColumnThirdRow
        var tblImage
        var tblTicketLink
        var tblBody

        for (var i = 0; i < data._embedded.events.length; i++) {
            console.log(data._embedded.events[i].name);
            tblFirstRow = document.createElement('tr');
            tblSecondRow = document.createElement('tr');
            tblThirdRow = document.createElement('tr');
            tblFirstColumn = document.createElement('td');
            tblSecondColumnFirstRow = document.createElement('td');
            tblSecondColumnSecondRow = document.createElement('td');
            tblSecondColumnThirdRow = document.createElement('td');
            tblTicketLink = document.createElement('a');
            tblImage = document.createElement("img");
            tblBody = tblResults.children[0];
            console.log(data._embedded.events[i].images[0].url);
            tblImage.src = data._embedded.events[i].images[0].url;
            tblImage.width= "205";
            tblImage.height= "115";
            tblTicketLink.href= data._embedded.events[i].url;
            tblTicketLink.appendChild(tblImage);
            tblFirstColumn.appendChild(tblTicketLink);
            tblFirstColumn.rowSpan= 3;
            if(data._embedded.events[i].dates.start.localTime == undefined) {
              tblSecondColumnFirstRow.textContent = data._embedded.events[i].name
              tblSecondColumnSecondRow.textContent = data._embedded.events[i].dates.start.localDate 
              tblSecondColumnThirdRow.textContent = data._embedded.events[i]._embedded.venues[0].name;
            } else {
              tblSecondColumnFirstRow.textContent = data._embedded.events[i].name
              tblSecondColumnSecondRow.textContent = data._embedded.events[i].dates.start.localDate + " " + data._embedded.events[i].dates.start.localTime
              tblSecondColumnThirdRow.textContent = data._embedded.events[i]._embedded.venues[0].name;
            }
            tblSecondRow.appendChild(tblSecondColumnSecondRow);
            tblThirdRow.appendChild(tblSecondColumnThirdRow);
            console.log(data._embedded.events[i].url);
            tblFirstRow.appendChild(tblFirstColumn);
            tblFirstRow.appendChild(tblSecondColumnFirstRow);
            tblBody.appendChild(tblFirstRow);
            tblBody.appendChild(tblSecondRow);
            tblBody.appendChild(tblThirdRow);
            console.log(tblResults);
        };

      });
    };
    
    
    findEvents