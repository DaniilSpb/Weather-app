// api key : febb7355330a85cf811de81505dd7611
//SELECT ELEMENTS
const iconElemet = document.querySelector(".weather-icon");
const tempElemet = document.querySelector(".temperature-value p");
const descElemet = document.querySelector(".temperature-description p");
const locationElemet = document.querySelector(".location p");
const notificationElemet = document.querySelector(".notification");

//app data
const weather ={};
weather.temperature={
    unit:"celsius",
};

//APP const
const KELVIN = 273;

//API KEY
const key ="febb7355330a85cf811de81505dd7611";
            

//BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition,showError);
}
else {
    notificationElemet.style.display = "block";
    notificationElemet.innerHTML = "<p> Browser doesn't support geolocation <p/>";
}
//set user position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude =position.coords.longitude;

    getWeater(latitude,longitude);
}

//SHOW ERROR WITH GEO POSITION
function showError(error){
    notificationElemet.style.display = "block";
    notificationElemet.innerHTML =`<p> ${error.messege}`;
}
// get weather

function getWeater(latitude,longitude){
    let api =`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(function(response){
            let data =response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        })
}

//display weather to UI
function displayWeather(){
    iconElemet.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElemet.innerHTML = `${weather.temperature.value}°<span> C</span>`;
    descElemet.innerHTML = weather.description;
    locationElemet.innerHTML = `${weather.city},${weather.country}`;
}
//C to F convert
function celsToFahren(temperature) {
    return (temperature *9/5) + 32;
}
//WHEN user click on temperature
tempElemet.addEventListener("click", function(){
    if(weather.temperature.unit === "celsius"){
        let fahrenheit = celsToFahren(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        tempElemet.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else {
        tempElemet.innerHTML = `${weather.temperature.value}°<span>C</span> `
        weather.temperature.unit = "celsius";
    }
});