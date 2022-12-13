function dayTimeToday(dtt) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[dtt.getDay()];
  let hour = dtt.getHours();
  let minutes = dtt.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes}`;
}
let now = new Date();
let displaydtt = document.querySelector("#time");
displaydtt.innerHTML = dayTimeToday(now);

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
