//Date and Time
let now = new Date();

let date = now.getDate();
let minutes = now.getMinutes();
let hour = now.getHours();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
time.innerHTML = `${day}, ${month} ${date} ${now.toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
})}`;

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
    if (index > 0 && index < 7) {
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
//LA Button
function laTemperature(response) {
  document.querySelector("#city-search").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let description = document.querySelector("#temp-description");
  description.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `icons/${response.data.weather[0].icon}.png`);

  fahrenheitTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function getLa(event) {
  event.preventDefault();

  searchLa(city);
}

function searchLa(city) {
  let apiKey = "147c7ccb0d8865155667a7334b1e39df";
  let lat = "34.0522";
  let lon = "-118.2437";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(laTemperature);
}

let laButton = document.querySelector("#LA");
laButton.addEventListener("click", getLa);

//NYC Button
function nycTemperature(response) {
  document.querySelector("#city-search").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let description = document.querySelector("#temp-description");
  description.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `icons/${response.data.weather[0].icon}.png`);

  fahrenheitTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function getNyc(event) {
  event.preventDefault();

  searchNyc(city);
}

function searchNyc(city) {
  let apiKey = "147c7ccb0d8865155667a7334b1e39df";
  let lat = "40.7143";
  let lon = "-74.006";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(nycTemperature);
}

let nycButton = document.querySelector("#NYC");
nycButton.addEventListener("click", getNyc);

//London Button
function londonTemperature(response) {
  document.querySelector("#city-search").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let description = document.querySelector("#temp-description");
  description.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `icons/${response.data.weather[0].icon}.png`);

  fahrenheitTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function getLondon(event) {
  event.preventDefault();

  searchLondon(city);
}

function searchLondon(city) {
  let apiKey = "147c7ccb0d8865155667a7334b1e39df";
  let lat = "51.5085";
  let lon = "-0.1257";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(londonTemperature);
}

let londonButton = document.querySelector("#London");
londonButton.addEventListener("click", getLondon);

//Tokyo Button
function tokyoTemperature(response) {
  document.querySelector("#city-search").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let description = document.querySelector("#temp-description");
  description.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `icons/${response.data.weather[0].icon}.png`);

  fahrenheitTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function getTokyo(event) {
  event.preventDefault();

  searchTokyo(city);
}

function searchTokyo(city) {
  let apiKey = "147c7ccb0d8865155667a7334b1e39df";
  let lat = "35.6895";
  let lon = "139.6917";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(tokyoTemperature);
}

let tokyoButton = document.querySelector("#Tokyo");
tokyoButton.addEventListener("click", getTokyo);
