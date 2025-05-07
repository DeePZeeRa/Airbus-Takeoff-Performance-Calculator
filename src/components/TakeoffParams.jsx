import React from 'react';
import { Info } from 'lucide-react';
import { flapSettings, thrustSettings, bleedSettings, antiIceSettings } from '../data/aircraftData';

const TakeoffParams = ({
  takeoffWeight,
  flapSetting,
  thrustSetting,
  bleedSetting,
  antiIceSetting,
  weightUnit,
  onWeightChange,
  onFlapSettingChange,
  onThrustSettingChange,
  onBleedSettingChange,
  onAntiIceSettingChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="flex flex-col">
        <div className="flex items-center mb-2">
          <label className="text-gray-500 text-sm font-medium">Takeoff Weight</label>
          <div className="ml-1 text-gray-400 cursor-help group relative">
            <Info size={16} />
            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-xs text-white p-2 rounded shadow-lg w-48">
              Enter the aircraft takeoff weight
            </div>
          </div>
        </div>
        <input
          type="number"
          className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={takeoffWeight}
          onChange={(e) => onWeightChange(Number(e.target.value))}
          placeholder={weightUnit === 'kg' ? '67000' : '147000'}
        />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center mb-2">
          <label className="text-gray-500 text-sm font-medium">Flap Setting</label>
          <div className="ml-1 text-gray-400 cursor-help group relative">
            <Info size={16} />
            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-xs text-white p-2 rounded shadow-lg w-48">
              Select the flap configuration for takeoff
            </div>
          </div>
        </div>
        <select
          className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={flapSetting}
          onChange={(e) => onFlapSettingChange(e.target.value)}
        >
          {flapSettings.map((setting) => (
            <option key={setting} value={setting}>
              {setting}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center mb-2">
          <label className="text-gray-500 text-sm font-medium">Thrust Setting</label>
          <div className="ml-1 text-gray-400 cursor-help group relative">
            <Info size={16} />
            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-xs text-white p-2 rounded shadow-lg w-48">
              Choose between maximum (TOGA) or reduced (FLEX) thrust
            </div>
          </div>
        </div>
        <select
          className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={thrustSetting}
          onChange={(e) => onThrustSettingChange(e.target.value)}
        >
          {thrustSettings.map((setting) => (
            <option key={setting} value={setting}>
              {setting}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center mb-2">
          <label className="text-gray-500 text-sm font-medium">Bleed Setting</label>
          <div className="ml-1 text-gray-400 cursor-help group relative">
            <Info size={16} />
            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-xs text-white p-2 rounded shadow-lg w-48">
              Select pneumatic bleed air configuration
            </div>
          </div>
        </div>
        <select
          className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={bleedSetting}
          onChange={(e) => onBleedSettingChange(e.target.value)}
        >
          {bleedSettings.map((setting) => (
            <option key={setting} value={setting}>
              {setting}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center mb-2">
          <label className="text-gray-500 text-sm font-medium">Anti-ice Setting</label>
          <div className="ml-1 text-gray-400 cursor-help group relative">
            <Info size={16} />
            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-xs text-white p-2 rounded shadow-lg w-48">
              Select anti-ice system configuration
            </div>
          </div>
        </div>
        <select
          className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={antiIceSetting}
          onChange={(e) => onAntiIceSettingChange(e.target.value)}
        >
          {antiIceSettings.map((setting) => (
            <option key={setting} value={setting}>
              {setting}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TakeoffParams;
