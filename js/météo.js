// Create api for data weather

const apiKey = ""
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=bordeaux";

async function checkWeather() {
  try {
    const response = await fetch(apiUrl + `&appid=${apiKey}`);
    const data = await response.json();
    console.log(data);

    document.querySelector(".weather-icon").innerHTML = data.weather[0].main // Weather-icon
    document.querySelector(".temp").innerHTML = data.main.temp // Temperature
    document.querySelector(".weather-description").innerHTML = data.weather[0].description // Weather-description
    document.querySelector(".city").innerHTML = data.name // City
    document.querySelector(".country").innerHTML = data.sys.country // Country
    document.querySelector(".thermo").innerHTML = data.main.feels_like // Fells like
    document.querySelector(".humidity").innerHTML = data.main.humidity// Humidity
    
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

checkWeather();
