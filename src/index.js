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
  let temperature = Math.round(response.data.main.temp);

  let displayTemperature = document.querySelector("#temperature");
  displayTemperature.innerHTML = temperature;

  let location = response.data.name;

  let city = document.querySelector("#city");
  city.innerHTML = location;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#time").innerHTML = formatDate(
    response.data.dt * 1000
  );
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

search("Stockholm");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

//Current Location Button

function showLocWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let displayTemperature = document.querySelector("#temperature");
  displayTemperature.innerHTML = temperature;

  let location = response.data.name;

  let city = document.querySelector("#city");
  city.innerHTML = location;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#time").innerHTML = formatDate(
    response.data.dt * 1000
  );
}

function searchLocation(position) {
  let long = position.coords.longitude;
  let lat = position.coords.latitude;

  let units = "metric";

  let apiKey = "58a6775f97527351bf6c6966e209be39";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);

  axios.get(apiUrl).then(showLocWeather);
}

function navigatePosition() {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#location");
currentLocationButton.addEventListener("click", navigatePosition);
