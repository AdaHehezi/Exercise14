let city;

async function clickHandler() {
city = document.getElementById('city').value;
let isZipCode = /^\d+$/.test(city);
let cityName = isZipCode ? await getCityNameByZip(city) : city;

let apiKey = '93f26e3c57081a6210de53b8dcfdfea4'; 
let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

try {
    let response = await fetch(url);
    if(response.ok){
        let data = await response.json();
        displayData(data);
    }else{
        displayError("City not found. Please try again.");
    }
    
} catch (error) {
    console.error('Error fetching weather data:', error);
    document.getElementById('weather').innerHTML = 'Error fetching weather data.';
   }
}

async function getCityNameByZip(zip) {
    let zipApiUrl = `https://api.zippopotam.us/us/${zip}`;
    try {
        let response = await fetch(zipApiUrl);
        if (response.ok) {
            let data = await response.json();
            return data.places[0]['place name'];
        } else {
            return 'Unknown City';
        }
    } catch (error) {
        console.error('Error fetching city data:', error);
        return 'Unknown City';
    }
}

async function displayData(data) {
let imgurl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

let isZipCode = /^\d+$/.test(city);
let cityName = isZipCode ? await getCityNameByZip(city) : city;

let currentDate = new Date();

let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    
let formattedDate = currentDate.toLocaleDateString(undefined, options);

let weatherIconClass;
switch (data.weather[0].icon) {
    case '01d':
        weatherIconClass = 'wi-day-sunny';
        break;
    case '01n':
        weatherIconClass = 'wi-night-clear';
        break;
    case '02d':
        weatherIconClass = 'wi-day-cloudy';
        break;
    case '02n':
        weatherIconClass = 'wi-night-alt-cloudy';
        break;
    case '03d':
    case '03n':
    case '04d':
    case '04n':
        weatherIconClass = 'wi-cloudy';
        break;
    case '09d':
    case '09n':
        weatherIconClass = 'wi-showers';
        break;
    case '10d':
    case '10n':
        weatherIconClass = 'wi-rain';
        break;
    case '11d':
    case '11n':
        weatherIconClass = 'wi-thunderstorm';
        break;
    case '13d':
    case '13n':
        weatherIconClass = 'wi-snow';
        break;
    case '50d':
    case '50n':
        weatherIconClass = 'wi-fog';
        break;
    default:
        weatherIconClass = 'wi-day-sunny'; 
        break;
    }

let weatherIcon = `<i class="wi ${weatherIconClass}"></i>`;

let table = `
    <h1>${cityName}</h1>
    <p><strong>${formattedDate}</strong></p>
    <span class="weather-icon">${weatherIcon}</span>
    <table>
    
    <tr>
        <td>Weather</td>
        <td>${data.weather[0].main}</td>
    </tr>
    <tr>
        <td>Low Temp</td>
        <td>${Math.floor(data.main.temp_min - 273)} °c</td>
    </tr>
    <tr>
        <td>High Temp</td>
        <td>${Math.floor(data.main.temp_max - 273)} °c</td>
    </tr>
    <tr>
        <td>Wind</td>
        <td>${data.wind.speed} mph</td>
    </tr>
    
    </table>`;


    document.getElementById('weather').innerHTML = table;
    document.getElementById('modal').style.display = 'block';
}

function displayError(message) {
    document.getElementById('weather').innerHTML = message;
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
     document.getElementById('modal').style.display = 'none';
}