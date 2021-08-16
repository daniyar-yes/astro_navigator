// We need to get location first. This will be used for Weather API and in calculations of Alt and Azi of the sky object
let locationDiv = document.getElementById("location");
var lat;
var lon;
var geoCoordinates = [];

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        locationDiv.innerHTML = "The Browser Does not Support Geolocation";  
    }
}

    function showPosition(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        locationDiv.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
        console.log(lat, lon);  //it works, it writes it into an array. Let's try calling it from outside the function.
        let cityId = 6173331;
        weatherBalloon(lat, lon);
    }
        
        
        

        //Now we can call weather API, knowing the location above
        
    function showError(error) {
        if (error.PERMISSION_DENIED) {
            locationDiv.innerHTML = "The User has denied the request for Geolocation.";
        }
    }

    getLocation();

    //trying to get Lat and Lon to pass further

    /*function writeCoords() {
        let currentLat = position.coords.latitude;
        let currentLon = position.coords.longitude;
        return {
            currentLat,
            currentLon
        };
        }
    let currentLatLon = writeCoords();
    let currentLatitude = currentLatLon.currentLat;
    let currentLongitude = currentLatLon.currentLon;
    console.log(currentLatitude, currentLongitude);
    */

//Now we can call weather API, knowing the location above
    
    
     //Vancouver cityId from OpenWeatherMap API documentation, will change to dynamically take lon and lat from geolocation
function weatherBalloon(lat, lon) {
    var key = 'dde16ee40d3e7c3b58b282eeee4eeeeb';
    fetch('https://api.openweathermap.org/data/2.5/weather?' + `lat=${lat}` + `&lon=${lon}` + '&appid=' + key)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      console.log(data);
      drawWeather(data)
    })
    .catch(function() {
      // catch any errors
    });
  }
  
  //window.onload = function() {
    
  //}

//Adding function to pass the WeatherAPI data into HTML elements.

function drawWeather ( d ) {
    var celcius = Math.round(parseFloat(d.main.temp)-273.15);
    var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32);
    var clouds = d.weather[0].description;
    


    document.getElementById('description').innerHTML = 'Visibility: ' + clouds;
    document.getElementById('temp').innerHTML = celcius + '&deg;';
    document.getElementById('location-weather').innerHTML = d.name;
}

//Here we set countdown timer elements and get current date. Current date will be used for Alt and Azi calculation later.
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minsEl = document.getElementById('mins');
const secondsEl = document.getElementById('seconds');

const astroEvent = '22 Sep 2021';

function countdown() {
    const currentDate = new Date();
    const astroEventDate = new Date(astroEvent);
    
    const totalSeconds = (astroEventDate - currentDate) / 1000;

    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const mins = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    daysEl.innerHTML = days;
    hoursEl.innerHTML = formatTime(hours);
    minsEl.innerHTML = formatTime(mins);
    secondsEl.innerHTML = formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? (`0${time}`) : time;
}

// initial call
countdown();

setInterval(countdown, 1000);