const key = "fe3361e05c9c082128709b482d96a4cc";

function f1() {
    $("#formCity").on('submit', (e) => {
        let searchedCity = $('#searchCity').val();
        getDataUsingCity(searchedCity, key);
        searchedCity = "";
        e.preventDefault();
    });
}
function getDataUsingCity(cityInput, key) {
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + key + "&units=metric";
    getData(url);
}
function f2() {
    $("#formLatLong").on('submit', (e) => {
        let searchedLatLong = $('#searchLatLong').val();
        let array = searchedLatLong.split(" ");
        getDataUsingMeasures(array[0], array[1], key);
        searchedLatLong = "";
        e.preventDefault();
    });
}
function getDataUsingMeasures(latitude, longitude, key) {
    let url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + key + "&units=metric";
    getData(url);
}


function f3() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getGeoLocation);
      }
    else {
        alert("Your browser doesn't allow Geolocation API.");
    }
}
function getGeoLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + key + "&units=metric";
    getData(url);
}

function getData(url) {
    fetch(url)
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            console.log(data);
            
            let countryCode = data.sys.country;

            document.getElementById('name').innerHTML = data.name;
            document.getElementById('temp').innerHTML = data.main.temp + "&#176;";
            document.getElementById('temp2').innerHTML = data.main.temp_min + "&#176;" + " / " + data.main.temp_max + "&#176;"  + " / " + data.main.feels_like + "&#176;";
            document.getElementById('condition').innerHTML = data.weather[0].main + " / " + data.weather[0].description;
            document.getElementById('humidity').innerHTML = data.main.humidity + "g/m^3";
            document.getElementById('pressure').innerHTML = data.main.pressure + "Pa";
            
            const date = new Date();
            const y = date.getFullYear();
            const m = date.getMonth();
            const d = date.getDate();
            const time = date.getHours() + ":" + date.getMinutes();

            document.getElementById('date').innerHTML = `${d}/${m + 1}/${y}`;
            document.getElementById('time').innerHTML = time;
            let deg = data.wind.deg;
            let dir;
            if (deg <= 90) dir = "East";
            else if(deg <= 180) dir = "South";
            else if (deg <= 270) dir = "West";
            else dir = "North";
            document.getElementById('wind').innerHTML = data.wind.speed + "km/h / " + dir;
            getCountryName(countryCode);
        })
    .catch(function (error) {
            console.log(error);
    });
}

function getCountryName(countryCode) {
    let url = "https://restcountries.com/v3.1/alpha/" + countryCode;
    fetch(url)
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            let countryName = data[0].name.official;
            document.getElementById('country').innerHTML = countryName;
        });
}

f1();
f2();
f3();