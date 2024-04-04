// Create api for data weather

// state
let currCity = "bordeaux";
let units = "metric";

// Selectors
let city = document.querySelector(".weather__city");
let country = document.querySelector(".weather__country");
let weather__temperature = document.querySelector(".weather__temperature");
let weather__description = document.querySelector('.weather__description');
let weather__feels = document.querySelector('.weather__feels');
let weather__humidity = document.querySelector('.weather__humidity');

let back = document.querySelector('.header-arrow');
let gps = document.querySelector('.weather__search i');

document.querySelector(".weather__body").classList.add("hidden")

// btn gps
gps.addEventListener('click', e => {
  if (navigator.geolocation) {
    // if browser support geolocation api
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser not support geolocation api");
  }
});

function onSuccess(position) {
  const { latitude, longitude } = position.coords; // getting lat and lon of the user device from coords obj
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  fetchData();
}

// search
document.querySelector(".weather__search").addEventListener('submit', e => {
  let search = document.querySelector(".weather__searchform");
  // prevent default action
  e.preventDefault();
  // change current city
  currCity = search.value;
  // get weather forecast 
  getWeather();
  //hide the form
  document.querySelector(".weather__header").classList.add("hide")
  //show result
  document.querySelector(".weather__body").classList.add("show")
  // btn back
  back.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(".weather__body").classList.remove("show");
    document.querySelector(".weather__header").classList.remove("hide");
  });
  // clear form
  search.value = ""
}) 

// convert country code to name
function convertCountryCode(country){
    let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
    return regionNames.of(country)
}

function getWeather(){
  const API_KEY = "8a523a3e5ce017e811d6428ebd188062"

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`).then(res => res.json()).then(data => {
      console.log(data)
      city.innerHTML = `${data.name}`
      country.innerHTML = `${data.sys.country}`
      weather__temperature.innerHTML = `${data.main.temp.toFixed()}&#176`
      weather__feels.innerHTML = `${data.main.feels_like.toFixed()}&#176`
      weather__humidity.innerHTML = `${data.main.humidity}%`
      weather__description.innerHTML = `${data.weather[0].description}`
  })
}

function getImage(city) {
  // let search = document.querySelector(".weather__searchform");
  city = "Bordeaux";
  const UNSPLASH_ACCESS_KEY = "pVhGKm-YP9UgYu7d1H3yiOkaSDVrKrMjf8E7cykMJp0"

  fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=${UNSPLASH_ACCESS_KEY}`)
    .then(response => response.json())
    .then(data => {
      if (data.results && data.results.length > 0) {
        const imageUrl = data.results[0].urls.regular;
        document.body.style.backgroundImage = `url('${imageUrl},no-repeat')`;
        document.body.style.backgroundSize = "100% 100vh"
      } else {
        console.log("No images found for the city");
      }
    })
    .catch(error => {
      console.error("Error fetching image from Unsplash:", error);
    });
}

document.body.addEventListener('load', getWeather(), getImage())