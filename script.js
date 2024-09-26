const apiKey = "ee4a8f57b09ff3a6ea34d50963561c0f";
const apiUrl = 
`https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchInp = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");

const weather = document.querySelector(".weather")
const weatherIcon = document.querySelector(".weather-image i");

const Error = document.querySelector(".error");


async function checkWeather (city) {

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);  
        if (response.status === 404) {
            Error.style.display = "block";
            weather.style.display = "none";
        }    
    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) +  " &#8451";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";    
    
    if (data.weather[0].main === 'Clear') {
        weatherIcon.className = 'fa-solid fa-sun';
    } else if (data.weather[0].main === 'Rain') {
        weatherIcon.className = 'fa-solid fa-cloud-rain';
    } else if (data.weather[0].main === 'Mist') {
        weatherIcon.className = 'fa-solid fa-cloud-mist';
    } else if (data.weather[0].main === 'Drizzle') {
        weatherIcon.className = 'fa-solid fa-cloud-drizzle';
    } else if (data.weather[0].main === 'Clouds') {
        weatherIcon.className = 'fa-solid fa-cloud';
    }  
    
    weather.style.display = "block";
    Error.style.display = "none";

}


searchBtn.addEventListener("click" , () => {
    checkWeather(searchInp.value);
    searchInp.value = "";
});

// Спрацьовуватиме при натисканні на Enter
searchInp.addEventListener("keydown" , (event) => {
    if (event.keyCode === 13) {
        checkWeather(searchInp.value);
        searchInp.value = "";
    }   
});

