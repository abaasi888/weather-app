import React, { useState, useCallback } from 'react';
import './styles/App.css';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { getWeather, getCurrentLocation } from './services/weatherService';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherForCity = useCallback(async (city) => {
    setLoading(true);
    setError(null);
    
    try {
      const weatherData = await getWeather(city.latitude, city.longitude);
      setWeather({
        ...weatherData,
        city: city.name,
        country: city.country,
        region: city.admin1 || null
      });
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUseCurrentLocation = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const coords = await getCurrentLocation();
      const weatherData = await getWeather(coords.latitude, coords.longitude);
      setWeather({
        ...weatherData,
        city: 'Your Location',
        country: '',
        region: `${coords.latitude.toFixed(4)}°, ${coords.longitude.toFixed(4)}°`
      });
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCitySelect = useCallback((city) => {
    fetchWeatherForCity(city);
  }, [fetchWeatherForCity]);

  const handleRetry = useCallback(() => {
    setError(null);
  }, []);

  return (
    <div className="app">
      <div className="app-header">
        <h1>🌤️ weather app</h1>
      </div>
      
      <div className="main-content">
        <SearchBar 
          onCitySelect={handleCitySelect}
          onUseCurrentLocation={handleUseCurrentLocation}
          loading={loading}
        />
        
        {error && (
          <ErrorMessage 
            message={error} 
            onRetry={handleRetry}
            retryText="Try Again"
          />
        )}
        
        <WeatherCard weather={weather} loading={loading && !error} />
      </div>
      
      {loading && <LoadingSpinner message="Fetching latest weather data..." />}
    </div>
  );
}

export default App;