const apiKey = ""; //Insert an OpenWeatherMap API key here

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const refreshBtn = document.getElementById("refreshBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const icon = document.getElementById("weatherIcon");
const card = document.getElementById("weatherCard");
const errorMessage = document.getElementById("errorMessage");

let currentCity = "";

async function fetchWeather(city) {
  try {
    errorMessage.textContent = "";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`,
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    currentCity = city;

    cityName.textContent = data.name;
    temperature.textContent = `Temperature: ${Math.round(data.main.temp)}°F`;
    description.textContent = data.weather[0].description;

    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    card.classList.remove("hidden");
  } catch (error) {
    card.classList.add("hidden");
    errorMessage.textContent = error.message;
  }
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});

refreshBtn.addEventListener("click", () => {
  if (currentCity) fetchWeather(currentCity);
});
