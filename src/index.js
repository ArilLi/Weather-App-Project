//Format date

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hour}:${minutes}`;
}

//City Search

function showCityWeather(response) {
  celTempGlobal = response.data.main.temp;
  let temperature = Math.round(celTempGlobal);
  let displayTemperature = document.querySelector("#temperature");
  displayTemperature.innerHTML = temperature;

  let location = response.data.name;
  let city = document.querySelector("#city");
  city.innerHTML = location;

  let description = response.data.weather[0].main;
  let displayDescription = document.querySelector("#description");
  displayDescription.innerHTML = description;

  let humidity = Math.round(response.data.main.humidity);
  let displayHumidity = document.querySelector("#humidity");
  displayHumidity.innerHTML = humidity;

  let wind = Math.round(response.data.wind.speed);
  let displayWind = document.querySelector("#wind");
  displayWind.innerHTML = wind;

  let time = formatDate(response.data.dt * 1000);
  displayTime = document.querySelector("#time");
  displayTime.innerHTML = time;

  let icon = response.data.weather[0].icon;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `icons/${icon}.svg`);

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

function search(city) {
  let units = "metric";
  let apiKey = "58a6775f97527351bf6c6966e209be39";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCityWeather);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  search(city);
}

//Current Location

function showLocWeather(response) {
  celTempGlobal = response.data.main.temp;
  let temperature = Math.round(celTempGlobal);
  let displayTemperature = document.querySelector("#temperature");
  displayTemperature.innerHTML = temperature;

  let location = response.data.name;
  let city = document.querySelector("#city");
  city.innerHTML = location;

  let description = response.data.weather[0].main;
  let displayDescription = document.querySelector("#description");
  displayDescription.innerHTML = description;

  let humidity = Math.round(response.data.main.humidity);
  let displayHumidity = document.querySelector("#humidity");
  displayHumidity.innerHTML = humidity;

  let wind = Math.round(response.data.wind.speed);
  let displayWind = document.querySelector("#wind");
  displayWind.innerHTML = wind;

  let time = formatDate(response.data.dt * 1000);
  displayTime = document.querySelector("#time");
  displayTime.innerHTML = time;

  let icon = response.data.weather[0].icon;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `icons/${icon}.svg`);

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

function searchLocation(position) {
  let long = position.coords.longitude;
  let lat = position.coords.latitude;
  let units = "metric";
  let apiKey = "58a6775f97527351bf6c6966e209be39";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showLocWeather);
}

function navigatePosition() {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//Temperature converter
function showFahTemp(event) {
  event.preventDefault();
  let fahTemp = Math.round((celTempGlobal * 9) / 5 + 32);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = fahTemp;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function showCelTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celTempGlobal);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

//Global variables + Events

let celTempGlobal = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector("#location");
currentLocationButton.addEventListener("click", navigatePosition);

let fahrenheitLink = document.querySelector("#fah");
fahrenheitLink.addEventListener("click", showFahTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelTemp);

search("Stockholm");
