import React, { useState } from 'react';
import { Info, CloudRain } from 'lucide-react';
import { fetchWeatherData } from '../services/weatherService';
import { surfaceConditions } from '../data/aircraftData';

const WeatherConditions = ({
  icaoCode,
  wind,
  temperature,
  pressure,
  surfaceCondition,
  onWindChange,
  onTemperatureChange,
  onPressureChange,
  onSurfaceConditionChange,
  onWeatherLoaded
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [metarData, setMetarData] = useState(null);

  const handleFetchWeather = async () => {
    if (!icaoCode || icaoCode.length !== 4) {
      setError('Please enter a valid 4-letter ICAO code');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherData(icaoCode);
      if (data) {
        const formattedWind = `${data.wind_direction.toString().padStart(3, '0')}/${data.wind_speed.toString().padStart(2, '0')}`;
        onWindChange(formattedWind);
        onTemperatureChange(data.temperature);
        onPressureChange(data.altimeter);
        setMetarData(data.raw);
        onWeatherLoaded();
      } else {
        setError('Failed to fetch weather data');
      }
    } catch (err) {
      setError('Error fetching weather data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">Weather Conditions</h3>
        <button
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          onClick={handleFetchWeather}
          disabled={loading || !icaoCode}
        >
          <CloudRain size={16} className="mr-1.5" />
          {loading ? 'Loading...' : 'Populate Weather'}
        </button>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}
      {metarData && (
        <div className="bg-gray-800 border border-gray-700 rounded-md p-2">
          <p className="text-gray-300 text-sm font-mono">{metarData}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <label className="text-gray-500 text-sm font-medium">Wind</label>
            <div className="ml-1 text-gray-400 cursor-help group relative">
              <Info size={16} />
              <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-xs text-white p-2 rounded shadow-lg w-48">
                Wind in DDD/SS format (direction/speed)
              </div>
            </div>
          </div>
          <input
            type="text"
            className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={wind}
            onChange={(e) => onWindChange(e.target.value)}
            placeholder="270/10"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <label className="text-gray-500 text-sm font-medium">Temperature (°C)</label>
            <div className="ml-1 text-gray-400 cursor-help group relative">
              <Info size={16} />
              <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-xs text-white p-2 rounded shadow-lg w-48">
                Outside air temperature in Celsius
              </div>
            </div>
          </div>
          <input
            type="number"
            className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={temperature}
            onChange={(e) => onTemperatureChange(Number(e.target.value))}
            placeholder="15"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <label className="text-gray-500 text-sm font-medium">Pressure (inHg)</label>
            <div className="ml-1 text-gray-400 cursor-help group relative">
              <Info size={16} />
              <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-xs text-white p-2 rounded shadow-lg w-48">
                Barometric pressure in inches of mercury
              </div>
            </div>
          </div>
          <input
            type="number"
            step="0.01"
            className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={pressure}
            onChange={(e) => onPressureChange(Number(e.target.value))}
            placeholder="29.92"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <label className="text-gray-500 text-sm font-medium">Surface Condition</label>
            <div className="ml-1 text-gray-400 cursor-help group relative">
              <Info size={16} />
              <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-xs text-white p-2 rounded shadow-lg w-48">
                Runway surface condition
              </div>
            </div>
          </div>
          <select
            className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={surfaceCondition}
            onChange={(e) => onSurfaceConditionChange(e.target.value)}
          >
            {surfaceConditions.map((condition) => (
              <option key={condition} value={condition}>
                {condition}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default WeatherConditions;
