// Make map and configures size
const usMap = L.map("map", {
    center: [40, -95],
    zoom: 3.5,
});

// Make map view from space
const spaceView = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", 
{
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    
    maxZoom: 19,
    
    zoomOffset: -1,

    tileSize: 510,
    
    id: "mapbox/satellite-streets-v11",

    accessToken: API_KEY

}).addTo(usMap);

//Website URl for earthquake data
const url_earthquake_week = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Creates circles to show earthquakes
d3.json(url_earthquake_week, function(earthquakePlots) {

    function circleConfig(feature){

        return {

            opacity: .2,
            fillOpacity: .5,
            fillColor: circleColor(feature.properties.mag),
            color: "#000000",
            radius: (feature.properties.mag) * 3.5,
            stroke: true,
            weight: 1

        };
    }

    // Creates the color of circles, the higher the magnitude the darker the circle
    function circleColor(magnitude)
    {
        if (magnitude >= 4){
            return "#ff3333";
        }else if (magnitude >= 3){
            return "#ff9a33";
        }else if (magnitude >= 2){
            return "#ffcc33";
        }else if (magnitude >= 1){
            return "#ccff33";
        }else if (magnitude >= 0){
            return "#d9ff66";
        }else{
            return "#33ff33";
        }
    }

    // Add all of the circles to the map
    L.geoJSON(earthquakePlots, 
        {
        pointToLayer: function(feature, latlng) 
        {
            return L.circleMarker(latlng);
        },
        style: circleConfig,

        //Click on circles to display info
        onEachFeature: function(feature, layer) 
        {
        layer.bindPopup("<h3>" + feature.properties.place +
        "</p><p> Magnitude " + feature.properties.mag + "</p>");
        }
        
    }).addTo(usMap);
    
});