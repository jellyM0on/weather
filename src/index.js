import './style.css'

//get api
async function getWeather(city){
    try{
        const info = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=4b812d8f160b178f3fb173a9c1a28dff`, {mode: 'cors'})
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
    etc = []; 
    return { city, state, temp, descrip, etc }
}

function setContent(id, text){
    const element = document.getElementById(id);
    element.textContent = text;
}

function showWeather(data){
    const weather = weatherInfo(data.name, data.weather[0].main, null, data.weather[0].description, null); 
    weather.temp = [data.main.temp, data.main.temp_min, data.main.temp_max];
    weather.etc = [data.main.humidity, data.main.pressure, data.wind.speed];

    console.log(weather); 

    setContent('location-name', `${weather.city}`)
    setContent('weather-state', `${weather.state}`)
    setContent('current-temp', `${weather.temp[0]}`)
    setContent('min-temp', `${weather.temp[1]}`)
    setContent('max-temp', `${weather.temp[2]}`)
    setContent('weather-descrip', `${weather.descrip}`)
    setContent('humidity', `${weather.etc[0]}`)
    setContent('pressure', `${weather.etc[1]}`)
    setContent('wind', `${weather.etc[2]}`)
}



const userForm = document.querySelector('#userInput'); 
userForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const city = document.querySelector('#city').value
    getWeather(city)
}); 

console.log('hi')



