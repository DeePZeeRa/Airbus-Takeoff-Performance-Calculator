import React, { useState, useEffect } from 'react';
import { Search, Info } from 'lucide-react';
import { fetchAirportData } from '../services/airportService';

const AirportData = ({icaoCode,selectedRunway,toraLength,lengthUnit,weightUnit,onIcaoChange,onRunwayChange,onToraLengthChange,onLengthUnitChange,onWeightUnitChange}) => {
  const [airport, setAirport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toralen,setToralen] = useState(null);
  const [runway1,setRunway1] = useState('');
    const [runway2,setRunway2] = useState('');

  const handleFetchAirport = async () => {
    if (!icaoCode || icaoCode.length !== 4) {
      setError('Please enter a valid 4-letter ICAO code');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchAirportData(icaoCode);
      if (data) {
        setAirport(data);
        // Select first runway by default if available
        if (data.runways && data.runways.length > 0 && !selectedRunway) {
          onRunwayChange(data.runways[0].ident);
          onToraLengthChange(data.runways[0].length_ft);
        }
      } else {
        setError('Failed to fetch airport data');
      }
      console.log(data.runways.ident1);
    } catch (err) {
      setError('Error fetching airport data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Update TORA length when runway selection changes
  useEffect(() => {
    if (airport?.runways) {
      const runway = airport.runways.find(r => r.ident === selectedRunway);
      if (runway) {
        onToraLengthChange(runway.length_ft);
      }
    }
  }, [selectedRunway, airport]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <label className="text-gray-500 text-sm font-medium">Airport</label>
            <div className="ml-1 text-gray-400 cursor-help group relative">
              <Info size={16} />
              <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-xs text-white p-2 rounded shadow-lg w-48">
                Enter the 4-letter ICAO code for your departure airport
              </div>
            </div>
          </div>
          <div className="flex">
            <input
              type="text"
              className="bg-gray-800 text-white border border-gray-700 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow uppercase"
              placeholder="ICAO"
              value={icaoCode}
              onChange={(e) => onIcaoChange(e.target.value.toUpperCase())}
              maxLength={4}
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              onClick={handleFetchAirport}
              disabled={loading}
            >
              {loading ? 'Loading...' : <Search size={18} />}
            </button>
          </div>
          {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
          {airport && (
            <p className="text-green-400 text-xs mt-1">
              {airport.name}, Elevation: {airport.elevation} ft
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <label className="text-gray-500 text-sm font-medium">Runway</label>
            <div className="ml-1 text-gray-400 cursor-help group relative">
              <Info size={16} />
              <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-xs text-white p-2 rounded shadow-lg w-48">
                Select the runway for departure
              </div>
            </div>
          </div>
          <select
            className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedRunway}
            onChange={(e) => onRunwayChange(e.target.value)}
            disabled={!airport || !airport.runways?.length}
          >
            <option value="">Select Runway</option>
            {airport?.runways?.map((runway) => (
              <option key={runway.ident} value={runway.ident}>
                {runway.ident1}/{runway.ident2} - {runway.length_ft} ft
                
              </option>
            ))
            }
            
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <label className="text-gray-500 text-sm font-medium">TORA Length</label>
            <div className="ml-1 text-gray-400 cursor-help group relative">
              <Info size={16} />
              <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-xs text-white p-2 rounded shadow-lg w-48">
                Takeoff Run Available length
              </div>
            </div>
          </div>
          <input
            type="number"
            className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            value={toraLength}
            onChange={(e) => onToraLengthChange(Number(e.target.value))}
          />
          
        </div>

        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <label className="text-gray-500 text-sm font-medium">Length Units</label>
          </div>
          <select
            className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={lengthUnit}
            onChange={(e) => onLengthUnitChange(e.target.value)}
          >
            <option value="feet">Feet</option>
            <option value="meters">Meters</option>
          </select>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <label className="text-gray-500 text-sm font-medium">Weight Units</label>
          </div>
          <select
            className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={weightUnit}
            onChange={(e) => onWeightUnitChange(e.target.value)}
          >
            <option value="kg">Kilograms</option>
            <option value="lbs">Pounds</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AirportData;
