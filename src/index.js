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
  windElement.innerHTML = response.data.wind.speed;
  humidityElement.innerHTML = response.data.main.humidity;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `icons/${response.data.weather[0].icon}.png`);
}

function search(event) {
  event.preventDefault();
  let apiKey = "147c7ccb0d8865155667a7334b1e39df";
  let city = document.querySelector("#search-text-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

//Farenheit to Celsius
//function convertToCelsius(event) {
//event.preventDefault();

//let temperatureElement = document.querySelector("#temperature");
//let temperature = temperatureElement.innerHTML;
//temperature = Number(temperature);
//temperatureElement.innerHTML = 66;
//}

//function convertToFahrenheit(event) {
//event.preventDefault();
//let temperatureElement = document.querySelector("#temperature");
//temperatureElement.innerHTML = 19;
//let fahrenheitTemperature = (14 * 9) / 5 + 32;
//let temperatureElement = document.querySelector("#temperature");
//temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
//}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

//let celsiusLink = document.querySelector("#celsius-link");
//celsiusLink.addEventListener("click", convertToCelsius);

//et fahrenheitLink = document.querySelector("#f-link");
//fahrenheitLink.addEventListener("click", convertToFahrenheit);

//Search Engine HM 5
let apiKey = "147c7ccb0d8865155667a7334b1e39df";
let city = "Arlington";
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
