import React from 'react';
import { Info } from 'lucide-react';

const CalculationOptions = ({
  useFlexTemp,
  useImprovedClimb,
  onFlexTempChange,
  onImprovedClimbChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col">
        <div className="flex items-center mb-2">
          <label className="text-gray-500 text-sm font-medium">Flex/Assumed Temperature</label>
          <div className="ml-1 text-gray-400 cursor-help group relative">
            <Info size={16} />
            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-xs text-white p-2 rounded shadow-lg w-64">
              Use flex temperature for reduced thrust takeoff calculations
            </div>
          </div>
        </div>
        <select
          className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={useFlexTemp ? 'enabled' : 'disabled'}
          onChange={(e) => onFlexTempChange(e.target.value === 'enabled')}
        >
          <option value="enabled">Enabled</option>
          <option value="disabled">Disabled</option>
        </select>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center mb-2">
          <label className="text-gray-500 text-sm font-medium">Improved Climb Calculations</label>
          <div className="ml-1 text-gray-400 cursor-help group relative">
            <Info size={16} />
            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-xs text-white p-2 rounded shadow-lg w-64">
              Enable improved climb calculations for better performance prediction
            </div>
          </div>
        </div>
        <select
          className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={useImprovedClimb ? 'enabled' : 'disabled'}
          onChange={(e) => onImprovedClimbChange(e.target.value === 'enabled')}
        >
          <option value="enabled">Enabled</option>
          <option value="disabled">Disabled</option>
        </select>
      </div>
    </div>
  );
};

export default CalculationOptions;
