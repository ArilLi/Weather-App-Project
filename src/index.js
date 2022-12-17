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

  test = document.querySelector("#container");

  if (temperature < 0) {
    test.classList.add("color-1");
    test.classList.remove("color-2", "color-3");
  } else {
    if (temperature > 19) {
      test.classList.add("color-3");
      test.classList.remove("color1", "color-2");
    } else {
      test.classList.add("color-2");
      test.classList.remove("color-1", "color-3");
    }
  }

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

  getForecast(response.data.coord);
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

  test = document.querySelector("#container");

  if (temperature < 0) {
    test.classList.add("color-1");
    test.classList.remove("color-2", "color-3");
  } else {
    if (temperature > 20) {
      test.classList.add("color-3");
      test.classList.remove("color1", "color-2");
    } else {
      test.classList.add("color-2");
      test.classList.remove("color-1", "color-3");
    }
  }

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

  getForecast(response.data.coord);
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

//Forecast

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  forecastElement = document.querySelector("#jsforecast");

  let forecastHTML = `<div class="row row-3">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 col-forecast">
            <p class="small-day">${formatForecastDay(forecastDay.dt)}</p>
            <div class="small-weather">
              <img src="icons/${forecastDay.weather[0].icon}.svg" width="40" />
            </div>
            <div class="small-temp-top">${Math.round(
              forecastDay.temp.max
            )}°</div>
            <div class="small-temp-bottom">${Math.round(
              forecastDay.temp.min
            )}°</div>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "58a6775f97527351bf6c6966e209be39";
  let lat = coordinates.lat;
  let long = coordinates.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//Global variables + Events

let celTempGlobal = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector("#location");
currentLocationButton.addEventListener("click", navigatePosition);

search("Stockholm");
