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
if("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition,eror);
}
else {
    notificationElemet.style.display = "block";
    notificationElemet.innerHTML = "<p> Browser doesn't support geolocation <p/>";
}
//set user position
function setPosition(){
    let latitude = position.coords.latitude;
    let longitude =position.coords.longitude;

    getWeater(latitude,longitude);
}

//SHOW ERROR WITH GEO POSITION
function showError(error){
    notificationElemet.innerHTML = `<p> ${error.messege}`;
}



