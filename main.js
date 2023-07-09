const container = document.querySelector('.container');
const search = document.querySelector(".search-container button");
const searchContainer = document.querySelector(".search-container");
const weatherContainer = document.querySelector(".weather-container");
const error = document.querySelector(".not-found-error");
const weatherDetails = document.querySelector(".weather-details");

search.addEventListener("click", () => {
    const API_KEY = '89b9458377c6c55b6d0a07ed461741a9';
    const city = document.querySelector(".search-container input").value;

    if(city === '') {
        searchContainer.classList.remove("shake");
        searchContainer.classList.add('shake');

        setTimeout(() => {
            searchContainer.classList.remove("shake");
        }, 1000);
    }


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`).then(response => response.json()).then(json => {
        if(json.cod === '404') {
            container.style.height = window.innerWidth <= 1024 ? '550px' : '600px';
            weatherContainer.style.display = 'none';
            error.style.display = 'block';
            error.classList.add('fade-in');
            weatherDetails.style.display = 'none';
            return;

        }

        error.style.display = 'none';
        error.classList.remove('fade-in');


        const image = document.querySelector(".weather-container img");
        const temprature = document.querySelector(".weather-container .temprature");
        const description = document.querySelector(
          ".weather-container .description"
        );
        const humidity = document.querySelector(".weather-details .humidity span");
        const wind = document.querySelector(
          ".weather-details .wind span"
        );

        displayImageBasedOnWeather(image, json);

        temprature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

        weatherContainer.style.display = '';
        weatherDetails.style.display = '';
        weatherContainer.classList.add('fade-in');
        weatherDetails.classList.add('fade-in');
        container.style.height = '590px';



    });

});

function displayImageBasedOnWeather(image, json) {
    switch (json.weather[0].main) {
          case "Clear":
            image.src = "assets/sunny-day.png";
            break;

          case "Rain":
            image.src = "assets/rainy-day.png";
            break;

          case "Snow":
            image.src = "assets/snowy-day.png";
            break;

          case "Clouds":
            image.src = "assets/cloudy-day.png";
            break;

          case "Haze":
            image.src = "assets/haze-day.png";
            break;

            default:
                image.src = '';
        }
}