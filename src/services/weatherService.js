import axios from 'axios';

const API_URL = 'https://avwx.rest/api/metar';
const API_TOKEN = import.meta.env.VITE_AVWX_TOKEN;

export const fetchWeatherData = async (icao) => {
  try {
    if (!icao || icao.length !== 4) {
      throw new Error('Invalid ICAO code. Please enter a valid 4-letter ICAO code.');
    }

    const response = await axios.get(`${API_URL}/${icao}`, {
      headers: {
        'Authorization': `BEARER ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    const data = response.data;
    
    return {
      icao: data.station,
      raw: data.raw,
      temperature: data.temperature ? data.temperature.value : 15,
      dewpoint: data.dewpoint ? data.dewpoint.value : 10,
      altimeter: data.altimeter ? data.altimeter.value : 29.92,
      wind_direction: data.wind_direction ? data.wind_direction.value : 0,
      wind_speed: data.wind_speed ? data.wind_speed.value : 0,
      wind_gust: data.wind_gust ? data.wind_gust.value : undefined
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};