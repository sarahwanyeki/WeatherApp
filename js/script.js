// The API Key
const apiKey = '8f8f93d3e145ff5f4251e8dfe11fb626';

document.getElementById('search-btn').addEventListener('click', function () {
  searchWeather();
});

document.getElementById('location-input').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') { 
    searchWeather();
  }
});

// Function to fetch and display weather data when called
function searchWeather() {
  const city = document.getElementById('location-input').value.trim();

  if (city) {
    getWeatherData(city);
  } else {
    alert('Please enter a city name.'); 
  }
}

// Function to fetch weather data from OpenWeatherMap
function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
      alert('Could not retrieve weather data. Please try again.');
    });
}

// Function to display weather data on the page
function displayWeather(data) {
  const { name, main, weather, wind } = data;
  const temperature = main.temp;
  const description = weather[0].description;
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const iconCode = weather[0].icon; 

  // Clear the previous weather data to prevent duplication
  const weatherResult = document.getElementById('weather-result');
  weatherResult.innerHTML = ''; 

  // Update the weather result container with new data
  weatherResult.innerHTML = `
    <h2>Weather in ${name}</h2>
    <div class="temp-icon-container">
      <img id="weather-icon" src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather Icon" width="50" height="50">
      <p class="temperature">${temperature} <span>°C</span></p>
    </div>
    <p id="weather-description">${description.charAt(0).toUpperCase() + description.slice(1)}</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} km/h</p>
  `;
}
