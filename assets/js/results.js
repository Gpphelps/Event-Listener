// creates the map in the element with the id=map2 and sets the veiw to the users chosen location from index.html
var map = L.map("map2").setView([localStorage.getItem("originLat"), localStorage.getItem("originLong")], 8);
/*Get location and start date values from the Index.html page which were placed in Local Storage as well as the pre-existing table*/
var startDate= localStorage.getItem("startDate");
var locLatLong= localStorage.getItem("locLatLong");
var originLat = localStorage.getItem("originLat");
var originLong = localStorage.getItem("originLong");
var tblResults = document.querySelector('#results');
// applies the map layer to the created map
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZ3BwaGVscHMiLCJhIjoiY2ttN3Y3cmx5MTFuZzJ1czNmaGhmZ3B0YSJ9.zUETVN98ZHqjHjcUG8OFTg',
}).addTo(map);

/* Return to the index.html page when this button is pressed.*/
document.getElementById("back-btn").addEventListener("click", function() {
  window.location.assign("./index.html");
});


/* This function sends the query to the Discovery API and assembles a table to contain the data items returned that we elected to display. */
function findEvents() {
      var strQuery = "https://app.ticketmaster.com/discovery/v2/events.json?latlong=" + locLatLong + "&sort=date%2Casc&unit=miles&radius=100&tab=events&startDateTime=" + startDate + "T00:00:00Z&apikey=r6SGj0AX62Qeuo5HGhQmP6lEqmuH9LBy"
      
      
      fetch(strQuery)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
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
        /*for loop that creates the following for events pulled from Discovery API */
        for (var i = 0; i < data._embedded.events.length; i++) {
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
            tblImage.src = data._embedded.events[i].images[0].url;
            tblImage.width= "205";
            tblImage.height= "115";
            /*Embed a link to the ticket sales site in the image*/
            tblTicketLink.href= data._embedded.events[i].url;
            tblTicketLink.appendChild(tblImage);
            tblFirstColumn.appendChild(tblTicketLink);
            /*Make the row span of the first column 3 so that the second column can contain three rows of data and share the same row height.*/
            tblFirstColumn.rowSpan= 3;
            /* Add the time to the date if it is returned, exclude it if it is not.*/
            if(data._embedded.events[i].dates.start.localTime == undefined) {
              tblSecondColumnFirstRow.textContent = data._embedded.events[i].name
              tblSecondColumnSecondRow.textContent = data._embedded.events[i].dates.start.localDate 
              tblSecondColumnThirdRow.textContent = data._embedded.events[i]._embedded.venues[0].name;
            } else {
              tblSecondColumnFirstRow.textContent = data._embedded.events[i].name
              tblSecondColumnSecondRow.textContent = data._embedded.events[i].dates.start.localDate + " " + data._embedded.events[i].dates.start.localTime
              tblSecondColumnThirdRow.textContent = data._embedded.events[i]._embedded.venues[0].name;
            }
            /*Add the current event to the map as a map pin.*/
            L.marker([data._embedded.events[i]._embedded.venues[0].location.latitude, data._embedded.events[i]._embedded.venues[0].location.longitude]).addTo(map)
                .bindPopup(data._embedded.events[i].name);
            tblSecondRow.appendChild(tblSecondColumnSecondRow);
            tblThirdRow.appendChild(tblSecondColumnThirdRow);
            tblFirstRow.appendChild(tblFirstColumn);
            tblFirstRow.appendChild(tblSecondColumnFirstRow);
            tblBody.appendChild(tblFirstRow);
            tblBody.appendChild(tblSecondRow);
            tblBody.appendChild(tblThirdRow);
        };

      });
    };
    
  
    /*Launch the findEvents() function upon page load. */
    findEvents()