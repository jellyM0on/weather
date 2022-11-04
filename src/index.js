import './style.css'

//get api
async function getWeather(city){
    const info = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=4b812d8f160b178f3fb173a9c1a28dff`, {mode: 'cors'})
    const infoData = await info.json()
    console.log(infoData);
    console.log(infoData.weather);
    return infoData; 
    //
};

const userForm = document.querySelector('#userInput'); 
userForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const city = document.querySelector('#city').value
    getWeather(city)
}); 

console.log('hi')



