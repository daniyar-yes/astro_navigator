// We need to get location first. This will be used for Weather API and in calculations of Alt and Azi of the sky object
let locationDiv = document.getElementById("location");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        locationDiv.innerHTML = "The Browser Does not Support Geolocation";  
    }
}

    function showPosition(position) {
        locationDiv.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
            }
            
        //Now we can call weather API, knowing the location above
        

        
    

    function showError(error) {
        if (error.PERMISSION_DENIED) {
            locationDiv.innerHTML = "The User has denied the request for Geolocation.";
        }
    }

    getLocation();
    
//Now we can call weather API, knowing the location above
    
    let lat = 49.2339414;
    let lon = -123.0241084;
function weatherBalloon(lat, lon) {
    var key = 'dde16ee40d3e7c3b58b282eeee4eeeeb';
    fetch('https://api.openweathermap.org/data/2.5/weather?' + `lat=${lat}`+ `&lon=${lon}` + '&appid=' + key)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      console.log(data);
    })
    .catch(function() {
      // catch any errors
    });
  }
  
  window.onload = function() {
    weatherBalloon(lat, lon);
  }


//Here we set countdown timer elements and get current date. Current date will be used for Alt and Azi calculation later.
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minsEl = document.getElementById('mins');
const secondsEl = document.getElementById('seconds');

const astroEvent = '13 Aug 2021';

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