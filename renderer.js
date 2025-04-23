let selectedCity = '' // Store the selected city's name

// Function to fetch weather data based on latitude and longitude
function fetchWeather(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`

  fetch(url)
    .then(response => response.json())
    .then(data => updateWeather(data))
    .catch(error => console.log(error))
}

// Function to update the weather UI based on the API data
function updateWeather(data) {
  const temperature = document.getElementById('temperature')
  const weatherIcon = document.getElementById('weather-icon')
  const body = document.body

  // Display the temperature in the navbar
  temperature.textContent = `${data.current_weather.temperature}°C`

  const weatherCode = data.current_weather.weathercode // Extract weather code from API

  // Remove all previously set weather background classes
  body.classList.remove('clear-sky', 'cloudy', 'rainy')

  // Choose background and icon based on weather code
  if (weatherCode === 0) {
    body.classList.add('clear-sky')
    weatherIcon.src = 'images/sunny.jpg'
  } else if ([1, 2, 3].includes(weatherCode)) {
    body.classList.add('cloudy')
    weatherIcon.src = 'images/cloudy.jpg'
  } else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode)) {
    body.classList.add('rainy')
    weatherIcon.src = 'images/rainy.jpg'
  } else {
    // Default to clear sky if unknown code
    body.classList.add('clear-sky')
    weatherIcon.src = 'images/sunny.jpg'
  }
}

// Function to handle city selection
function chooseCity(coordinates, city) {
  selectedCity = city // Update selected city name

  // Split coordinates string into latitude and longitude
  const [latitude, longitude] = coordinates.split(',')

  // Hide city selection buttons after a city is chosen
  const citySelectionContainer = document.getElementById('city-selection-container')
  citySelectionContainer.style.display = 'none'

  // Fetch weather data for the selected city
  fetchWeather(latitude, longitude)
}
