const apiKey = "0d17eb20573e92727e1818c7113f81c0";
const googleApi = "AIzaSyDQjxtoMdvcz6m57WL-w91hSLifjVWAD7I";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityCountry = document.getElementById("city-country");
const temp = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const searchBox = document.querySelector("#city-input");
const searchBtn = document.querySelector("#fetch-data-btn");
const weatherIcon = document.querySelector("#weather-icon");
const weatherDescription = document.querySelector(".weather-description");

async function checkWeather(city) {
  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    if (response.ok) {
      const data = await response.json();
      const timezone = await fetch(
        `https://timezone.abstractapi.com/v1/current_time/?api_key=b0a2d827a63540748534758cef7a726d&location=${city}`);
      if (timezone.ok) {
        const timezoneData = await timezone.json();
        console.log(data);
        console.log(timezoneData);
        document.querySelector(".weather-info").classList.add("roll-out");
        cityCountry.innerHTML = data.name + ", " + data.sys.country;
        document.querySelector("#date-time").innerHTML = timezoneData.datetime;
        temp.innerHTML = data.main.temp;
        humidity.innerHTML = data.main.humidity;
        windSpeed.innerHTML = data.wind.speed;
        weatherDescription.innerHTML = data.weather[0].description.toUpperCase();

        let main = data.weather[0].main;
        if (main == "Clouds") {
          weatherIcon.src = "./brokenClouds.png";
        } else if (main == "Clear") {
          weatherIcon.src = "./clearSky.png";
        } else if (main == "Rain") {
          weatherIcon.src = "./showerRain.png";
        } else if (main == "Drizzle") {
          weatherIcon.src = "./rain.png";
        } else if (main == "Mist") {
          weatherIcon.src = "./mist.png";
        }
      } else {
        throw new Error("Failed to fetch timezone data");
      }
    } else {
      throw new Error("City not found");
    }
  } catch (error) {
    console.log(error);
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "An error occurred: " + error.message;
    errorMessage.style.display = "block"; // Show the error message
    setTimeout(function () {
      errorMessage.style.display = "none"; // Hide the error message after a certain time (optional)
    }, 5000); // Adjust the timeout value as per your preference
    // Handle the error - Display an error message or perform necessary actions
  }
  
}


searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    searchBtn.click();
  }
});
