import React from 'react';
import { Info } from 'lucide-react';
import { aircraftTypes } from '../data/aircraftData';

const AircraftSelector = ({
  selectedType,
  selectedVariant,
  onTypeChange,
  onVariantChange,
  theme
}) => {
  const selectedAircraft = aircraftTypes.find(a => a.id === selectedType);
  const isDark = true; // Always use dark mode

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col">
        <div className="flex items-center mb-2">
          <label className="text-gray-500 text-sm font-medium">Aircraft Type</label>
          <div className="ml-1 text-gray-400 cursor-help group relative">
            <Info size={16} />
            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-xs text-white p-2 rounded shadow-lg w-48">
              Select the aircraft model you're flying
            </div>
          </div>
        </div>
        <select
          className="bg-gray-800 text-white border-gray-700 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
        >
          {aircraftTypes.map((aircraft) => (
            <option key={aircraft.id} value={aircraft.id}>
              {aircraft.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center mb-2">
          <label className="text-gray-500 text-sm font-medium">Variant or Airframe</label>
          <div className="ml-1 text-gray-400 cursor-help group relative">
            <Info size={16} />
            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-xs text-white p-2 rounded shadow-lg w-48">
              Select specific variant configuration
            </div>
          </div>
        </div>
        <select
          className="bg-gray-800 text-white border-gray-700 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedVariant}
          onChange={(e) => onVariantChange(e.target.value)}
        >
          {selectedAircraft?.variants.map((variant) => (
            <option key={variant.id} value={variant.id}>
              {variant.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AircraftSelector;