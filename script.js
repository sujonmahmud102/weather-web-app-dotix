const getWeatherButton = document.getElementById('get-weather');
const inputLocation = document.getElementById('location-input');
const weatherInfo = document.getElementById('weather-info');
const apiKey = '96ad016fa5a4fd01eb2d9e0835253a16';



// weather data fetching
const fetchWeather = () => {
    const location = inputLocation.value.trim();
    const selectedUnit = document.querySelector('input[name="unit"]:checked').value;


    // console.log(location, selectedUnit);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${selectedUnit}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            if (data.cod == 200) {
                weatherInfo.innerHTML = `
                ${data.weather[0].main==='Clouds'? `<img class="weather" src="/images/clouds.png" alt="">` : ''}
                ${data.weather[0].main==='Rain'? `<img class="weather" src="/images/rain.png" alt="">` : ''}
                ${data.weather[0].main==='Snow'? `<img class="weather" src="/images/snow.png" alt="">` : ''}
                ${data.weather[0].main==='Clear'? `<img class="weather" src="/images/clear.png" alt="">` : ''}
                ${data.weather[0].main==='Drizzle'? `<img class="weather" src="/images/drizzle.png" alt="">` : ''}
                ${data.weather[0].main==='Mist'? `<img class="weather" src="/images/mist.png" alt="">` : ''}
                ${data.weather[0].main==='Haze'? `<img class="weather" src="https://cdn-icons-png.flaticon.com/512/1779/1779807.png" alt="">` : ''}
              
                <h1 class="temparature">${data.main.temp}° ${selectedUnit === 'metric' ? 'C' : 'F'} ${data.weather[0].main} </h1>
             
                <h2 class="city">Weather in ${data.name}, ${data.sys.country}</h2>
                <div class="humidity-wind-info">
                    <div class="humidity-container">
                        <img src="/images/humidity.png" alt="">
                        <div>
                            <p class="humidity">${data.main.humidity}%</p>
                            <p>Humidity </p>
                        </div>
                    </div>
                    <div class="wind-container">
                        <img src="/images/wind.png" alt="">
                        <div>
                            <p class="wind">${data.wind.speed} ${selectedUnit === 'metric' ? 'm/s' : 'ml/h'}</p>
                            <p> Wind Speed</p>
                        </div>
                    </div>
            
                </div>
                `;
            } else if (data.cod == 404) {
                weatherInfo.innerHTML = `
                    <p class="error-message">Location not found. Please check the location name and try again.</p>
                `;
            } else {
                throw new Error('An error occurred while fetching weather data. Please try again later.');
            }
        })
        .catch(error => console.error(error))


}

inputLocation.addEventListener('keydown', event => {
    if (event.key === "Enter") {
        fetchWeather();
    }
})

getWeatherButton.addEventListener('click', fetchWeather);