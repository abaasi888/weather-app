const BASE_URL = 'https://geocoding-api.open-meteo.com/v1';
const WEATHER_URL = 'https://api.open-meteo.com/v1';

const weatherCodes = {
  0: { description: 'Clear sky', icon: '☀️' },
  1: { description: 'Mainly clear', icon: '🌤️' },
  2: { description: 'Partly cloudy', icon: '⛅' },
  3: { description: 'Overcast', icon: '☁️' },
  45: { description: 'Foggy', icon: '🌫️' },
  61: { description: 'Rain', icon: '🌧️' },
  71: { description: 'Snow', icon: '❄️' },
  95: { description: 'Thunderstorm', icon: '⛈️' }
};

export const searchCities = async (query) => {
  if (!query || query.trim().length < 2) return [];
  try {
    const response = await fetch(`${BASE_URL}/search?name=${encodeURIComponent(query)}&count=5&format=json`);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    return [];
  }
};

export const getWeather = async (latitude, longitude) => {
  try {
    const response = await fetch(`${WEATHER_URL}/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    const data = await response.json();
    const info = weatherCodes[data.current_weather.weathercode] || weatherCodes[0];
    return {
      temperature: Math.round(data.current_weather.temperature),
      windspeed: data.current_weather.windspeed,
      description: info.description,
      icon: info.icon
    };
  } catch (error) {
    throw new Error('Failed to fetch weather');
  }
};

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
      (error) => reject(new Error('Unable to get location'))
    );
  });
};
