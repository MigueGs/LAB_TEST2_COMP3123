import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import sampleData from './weather_api_output.json'; // aqui usare el file mio

const App = () => {
  const [weatherData, setWeatherData] = useState(sampleData); // en caso de algo usaro el json file
  const [city, setCity] = useState('Toronto');
  const [error, setError] = useState('');

  const API_KEY = '9fba8cb95b83ddd60bced716a2a0988e'; //API K

  const fetchWeather = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setError('City not found or API error. Displaying sample data.');
      setWeatherData(sampleData); // fallback
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    const inputCity = e.target.city.value.trim();
    if (inputCity) setCity(inputCity);
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={handleSearch}>
        <input type="text" name="city" placeholder="Enter city name" />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
          />
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default App;




