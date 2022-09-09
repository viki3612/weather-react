import React from "react";
import axios from "axios";
export default function Weather() {
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [weather, setWeather] = useState("");

  function showWeather(response) {
    setMessage(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "cf033e3091dfce784674bd3c6246897a";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showWeather);
  }

  function handleMessage(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="enter a city" onChange={handleMessage} />
      <input type="submit" value="Submit" />
    </form>
  );
  if (message) {
    return (
      <div>
        {form}

        <ul className="Message">
          {" "}
          <li>Temp: {Math.round(weather.temperature)}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {Math.round(weather.humidity)}%</li>
          <li>Wind: {Math.round(weather.wind)}km/h</li>{" "}
          <li>
            {" "}
            <img src={weather.icon} alt="weather icon" />{" "}
          </li>{" "}
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
