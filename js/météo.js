// Create api for data weather

const apiKey = ""
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=bordeaux";

async function checkWeather() {
  try {
    const response = await fetch(apiUrl + `&appid=${apiKey}`);
    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name
    document.querySelector(".country").innerHTML = data.sys.country

  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

checkWeather();
