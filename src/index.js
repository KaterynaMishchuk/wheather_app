//Date
let now = new Date();

let nowDate = document.querySelector("#nowDate");
let nowTime = document.querySelector("#nowTime");
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
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
let month = months[now.getMonth()];
let year = now.getFullYear();
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentTime = `${hours}:${minutes}`;
nowTime.innerHTML = currentTime;
let currentDate = `${day}, ${month}-${date}-${year}`;
nowDate.innerHTML = currentDate;

//week 5 homework
function search(city) {
  let apiKey = `a1f94fb539a22bb24c442c3aa550dfe5`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  city.innerHTML = cityInput.value;
  search(cityInput.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function showTemperature(response) {
  let tempNow = document.querySelector("#temp");
  let cityNow = document.querySelector("#city");
  let countryNow = document.querySelector("#country");
  let descriptionElement = document.querySelector("#description");
  let temperature = Math.round(response.data.main.temp);
  let cityShown = response.data.name;
  let countryShown = response.data.sys.country;
  let humidityP = document.querySelector("#humidity");
  let windS = document.querySelector("#wind");
  tempNow.innerHTML = `${temperature}`;
  cityNow.innerHTML = `${cityShown}`;
  countryNow.innerHTML = `${countryShown}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  windS.innerHTML = Math.round(response.data.wind.speed);
  humidityP.innerHTML = response.data.main.humidity;
}

function handlePosition(position) {
  let apiKey = "a1f94fb539a22bb24c442c3aa550dfe5";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getLocation);
