import './style.css'
import storm from './icons/storm.gif'
import clouds from './icons/clouds.gif'
import drizzle from './icons/drizzle.gif'
import wind from './icons/wind.gif'
import snow from './icons/snowflake.gif'
import clear from './icons/sun.gif'
import rain from './icons/rain.gif'


//get api
async function getWeather(city){
    try{
        const info = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=4b812d8f160b178f3fb173a9c1a28dff`, {mode: 'cors'})
        const infoData = await info.json()
        console.log(infoData);
        showWeather(infoData);
    }
    catch (error) {
        alert(error);
    }
};

const weatherInfo = (city, state, temp, descrip, etc) => {
    temp = []; 
    const edescrip = editDescrip(descrip); 
    etc = []; 

    function editDescrip(descrip) {
        const split = descrip.split("");
        split[0] = split[0].toUpperCase();
        const unsplit = split.join(""); 
        return unsplit
    }

    return { city, state, temp, edescrip, etc }
}

function setContent(id, text){
    const element = document.getElementById(id);
    element.textContent = text;
}

function showWeather(data){
    const weather = weatherInfo(`${data.name} ${data.sys.country}`, data.weather[0].main, null, data.weather[0].description, null); 
    weather.temp = [data.main.temp, data.main.temp_min, data.main.temp_max];
    weather.etc = [data.main.humidity, data.main.pressure, data.wind.speed];

    console.log(weather); 
    setContent('location-name', `${weather.city}`)
    setContent('weather-state', `${weather.state}`)
    setContent('current-temp', `${weather.temp[0]}`)
    setContent('min-temp', `${weather.temp[1]}`)
    setContent('max-temp', `${weather.temp[2]}`)
    setContent('weather-descrip', `${weather.edescrip}`)
    setContent('humidity', `${weather.etc[0]}`)
    setContent('pressure', `${weather.etc[1]}`)
    setContent('wind', `${weather.etc[2]}`)

    showDisplay(weather.state);
}

function showDisplay(state){
    const display = document.getElementById('weather-display')
    const img = document.createElement('img');
    display.appendChild(img); 

    switch (state) {
        case 'Thunderstorm':
            img.src = storm;
            break; 
        case 'Drizzle': 
            img.src = drizzle;
            break; 
        case 'Rain': 
            img.src = rain;
            break; 
        case 'Snow': 
            img.src = snow;
            break; 
        case 'Clouds': 
            img.src = clouds;
            break; 
        case 'Clear': 
            img.src = clear;
            break; 
        default: 
            img.src = wind;
    };
};

const userForm = document.querySelector('#userInput'); 
userForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const city = document.querySelector('#city').value
    getWeather(city)
}); 




