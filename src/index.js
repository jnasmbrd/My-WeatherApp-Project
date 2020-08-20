// Day and Time

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day}, ${hours}:${minutes}`;
}

// Current Date
function actualDate(date) {
  let todaysDate = new Date();
  let monthIndex = date.getMonth();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let month = months[monthIndex];

  return `${todaysDate.getDate()} ${month} ${todaysDate.getUTCFullYear()} `;
}

// Day and Time
let timeElement = document.querySelector("#current-time");
let currentTime = new Date();
timeElement.innerHTML = formatDate(currentTime);

let dateElement = document.querySelector("#current-date");
dateElement.innerHTML = actualDate(currentTime);

// Location, Weather, Humidity & Wind

function weatherCondition(response) {
  document.querySelector("#output-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}
function searchLocation(city) {
  let apiKey = "6df68f5433f668287bfc545331edd9d1";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(weatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;

  if (city !== "") {
    document.querySelector("#output-city").innerHTML = city;
    weatherCondition(city);
  } else {
    alert("Please type a city.");
  }
}

function currentPosition(position) {
  let apiKey = "6df68f5433f668287bfc545331edd9d1";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(weatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

//Search Engine
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

// Geolocation
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchLocation("Edmonton");
