import React from 'react';

const WeatherCard = ({ weather, loading }) => {
  if (loading) return <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>;
  if (!weather) return null;

  return (
    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
      <h2>{weather.city} {weather.country && `, ${weather.country}`}</h2>
      <div style={{ fontSize: '48px', margin: '20px 0' }}>{weather.icon} {weather.temperature}°C</div>
      <p>{weather.description}</p>
      <p>💨 Wind: {weather.windspeed} km/h</p>
    </div>
  );
};

export default WeatherCard;
