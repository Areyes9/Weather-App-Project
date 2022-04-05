//Date and Time
let now = new Date();

let date = now.getDate();
let minutes = now.getMinutes();
let hour = now.getHours();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let time = document.querySelector("#date");
time.innerHTML = `${day} ${month} ${date}, ${hour}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let days = ["Fri", "Sat", "Sun", "Mon"];
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-4">
              <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
            </div>
            <div class="col-4">
              <img
                src="icons/${forecastDay.weather[0].icon}.png"
                id="icon"
                width="40"
              />
            </div>
            <div class="col-4">
              <div class="forecast-temp">
                <span class="forecast-max">${Math.round(
                  forecastDay.temp.max
                )}°</span>
                <span class="forecast-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </div>
            </div>
            `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "147c7ccb0d8865155667a7334b1e39df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

// City
function showTemperature(response) {
  document.querySelector("#city-search").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  console.log(response);
  let description = document.querySelector("#temp-description");
  description.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let rainElement = document.querySelector("#rain");
  rainElement.innerHTML = response.data.rain;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `icons/${response.data.weather[0].icon}.png`);

  fahrenheitTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;

  searchCity(city);
}

function searchCity(city) {
  let apiKey = "147c7ccb0d8865155667a7334b1e39df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

//Farenheit to Celsius
function convertToCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink = document.querySelector("#f-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

searchCity("Fairfax");

//Search Engine HM 5
let apiKey = "147c7ccb0d8865155667a7334b1e39df";
let city = "Fairfax";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

//Current Location Button
function searchLocation(position) {
  let apiKey = "147c7ccb0d8865155667a7334b1e39df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

//Other Cities Buttons
function searchLa(position) {
  let apiKey = "147c7ccb0d8865155667a7334b1e39df";
  let city = "Los Angeles";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function getLaLocation(event) {
  event.preventDefault();
  navigator.geolocation.getLaPosition(searchLa);
}

let laButton = document.querySelector("#LA");
laButton.addEventListener("click", getLaLocation);
