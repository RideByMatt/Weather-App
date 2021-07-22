const input = document.querySelector('input');
const btn = document.querySelector('button');

const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');

const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');


const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&APPID=1713d6e40929d57082a2c7af104221d2';
const units = '&units=metric';

let city;
let url;

const getWeather = () => {
    city = (!input.value) ? 'Kraków' : input.value;
    url = apiLink + city + apiKey + units;

    axios.get(url)
        .then(res => {
        const temp = res.data.main.temp;
        const hum = res.data.main.humidity;
        const status = Object.assign({}, ...res.data.weather);

        cityName.textContent = res.data.name + '(' + res.data.sys.country + ')';
        weather.textContent = status.main;
        temperature.textContent = Math.floor(temp) + '°C';
        humidity.textContent = hum + '%';

        warning.textContent = '';
        input.value = '';

        if (status.id >=200 && status.id <300) {                            // tutaj sprawdzamy ID dla pogody - zgodnie z API
            photo.setAttribute('src' , "../img/thunderstorm.png");
        } else if (status.id >=300 && status.id <400) {
            photo.setAttribute('src' , "../img/drizzle.png");
        } else if (status.id >=500 && status.id <600) {
            photo.setAttribute('src' , "../img/rain.png");
        } else if (status.id >=600 && status.id <700) {
            photo.setAttribute('src' , "../img/ice.png");
        } else if (status.id >=700 && status.id <800) {
            photo.setAttribute('src' , "../img/fog.png");
        } else if (status.id === 800) {
            photo.setAttribute('src' , "../img/sun.png");
        } else if (status.id >=800 && status.id <900) {
            photo.setAttribute('src' , "../img/cloud.png");
        } else {
            photo.setAttribute('src' , "../img/unknown.png")
        }

        console.log(res.data);
    })
    .catch(()=> {warning.textContent = 'Wpisz poprawną nazwę miasta.'})         //tutaj wyłapujemy źle wpisaną wartość w Input
};

const enterCheck = () => {              //funkcja odpowiedzialna za Input poprzez Enter - zatwierdzanie
    if (event.keyCode === 13) {
        getWeather();
    }
};

getWeather();
btn.addEventListener('click', getWeather);
input.addEventListener('keyup', enterCheck); //wywołanie akcji na Input poprzez Enter




