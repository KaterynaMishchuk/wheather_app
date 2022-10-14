//Date Last Update
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let dateN = date.getDate();

  return `${day}, ${month}-${dateN}-${year}`;
}
function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
//forecast
function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#show-forecast");
  let forecastHTML = "";
  let daysName = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
  daysName.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col">
                  <ul>
                    <li class="days">${day}</li>
                    <li class="small-icon">
                      <i class="fa-solid fa-cloud"></i>
                    </li>
                    <li class="small-text">Cloudy</li>
                    <li class="forecast">19℃</li>
                    <li class="forecast">15℃</li>
                  </ul>
                </div>
                `;
  });
  forecastElement.innerHTML = forecastHTML;
}

//search
function search(city) {
  let apiKey = "1a6432c5ca7b6f9b0bee45c98d54ea71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  autocomplete = "off";
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

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "1a6432c5ca7b6f9b0bee45c98d54ea71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let tempNow = document.querySelector("#temp");
  let cityNow = document.querySelector("#city");
  let countryNow = document.querySelector("#country");
  let descriptionElement = document.querySelector("#description");
  let cityShown = response.data.name;
  let countryShown = response.data.sys.country;
  let humidityP = document.querySelector("#humidity");
  let windS = document.querySelector("#wind");
  let dateEl = document.querySelector("#nowDate");
  let timeEl = document.querySelector("#nowTime");
  let iconElement = document.querySelector("#icon");
  let temp = Math.round(response.data.main.temp);

  tempNow.innerHTML = `${temp}`;
  cityNow.innerHTML = `${cityShown}`;
  countryNow.innerHTML = `${countryShown}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  windS.innerHTML = Math.round(response.data.wind.speed);
  humidityP.innerHTML = response.data.main.humidity;
  dateEl.innerHTML = formatDate(response.data.dt * 1000);
  timeEl.innerHTML = formatTime(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemp = response.data.main.temp;
  getForecast(response.data.coord);
}

function handlePosition(position) {
  let apiKey = "1a6432c5ca7b6f9b0bee45c98d54ea71";
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

// Celsius Fahrenheit changing

function toFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahrenheitTemp);
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", toFahrenheit);

function toCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  temp.innerHTML = Math.round(celsiusTemp);
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", toCelsius);

let celsiusTemp = null;

search("Kyiv");
displayForecast();
