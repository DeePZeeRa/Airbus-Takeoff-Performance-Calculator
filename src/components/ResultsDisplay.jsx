import React from 'react';
import { AlertTriangle, Check, X } from 'lucide-react';
import RunwayVisualization from './RunwayVisualization';
import WindGauge from './WindGauge';
import SliderR from './SliderR'


const ResultsDisplay = ({ result, showRawOutput, onToggleOutput, ident1, ident2 }) => {
  if (!result) return null;
  console.log(ident1, ident2);

  const statusIcon = {
    success: <Check size={20} className="text-green-500" />,
    warning: <AlertTriangle size={20} className="text-yellow-500" />,
    error: <X size={20} className="text-red-500" />
  }[result.status || 'success'];

  return (
    <div className="rounded-xl bg-zinc-800 border border-gray-700 overflow-hidden transition-all duration-300 shadow-[0px_0px_20px_10px_rgba(60,113,221,0.7)]">
    {result.message && (
      <div className={`p-3 flex items-center ${
        result.status === 'warning' ? 'bg-yellow-900/30 text-yellow-200' : 
        result.status === 'error' ? 'bg-red-900/30 text-red-200' : 
        'bg-green-900/30 text-green-200'
      }`}>
        {statusIcon}
        <span className="ml-2">{result.message}</span>
      </div>
    )}

    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-100">Takeoff Performance <span className="text-sm font-normal text-gray-400">- About these calculations</span></h2>
        <div className="flex items-center space-x-2">
          <button 
            onClick={onToggleOutput}
            className="text-gray-400 hover:text-white text-sm px-3 py-1 rounded border border-gray-700 hover:border-gray-500 transition-colors"
          >
            {showRawOutput ? 'Formatted' : 'Raw Output'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="border-b border-gray-700 pb-2">
            <h3 className="text-sm font-medium text-gray-400">Aircraft Type</h3>
            <p className="text-lg font-medium text-white">{result.aircraftType}</p>
          </div>
          <div className="border-b border-gray-700 pb-2">
            <h3 className="text-sm font-medium text-gray-400">Engine Type</h3>
            <p className="text-lg font-medium text-white">{result.engineType}</p>
          </div>
          <div className='shadow-[0px_0px_10px_6px_rgba(60,113,221,0.7)] p-3 rounded-xl'>
            <h3 className="text-sm font-medium text-gray-400">Trim</h3>
            <p className="text-lg font-medium text-white">{result.takeoffTrim}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border-b border-gray-700 pb-2">
            <h3 className="text-sm font-medium text-gray-400">Weight</h3>
            <p className="text-lg font-medium text-white">
              {result.weight.toLocaleString()} {result.weightUnit}
            </p>
          </div>
          <div className="border-b border-gray-700 pb-2">
            <h3 className="text-sm font-medium text-gray-400">Bleed Setting</h3>
            <p className="text-lg font-medium text-white">{result.bleedSetting}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400">Anti-ice Setting</h3>
            <p className="text-lg font-medium text-white">{result.antiIceSetting}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border-b border-gray-700 pb-2">
            <h3 className="text-sm font-medium text-gray-400">Flap Setting</h3>
            <p className="text-lg font-medium text-white">{result.flapSetting}</p>
          </div >
          <div className="border-b border-gray-700 pb-2">
            <h3 className="text-sm font-medium text-gray-400">Thrust Setting</h3>
            <p className="text-lg font-medium text-white">{result.thrustSetting}</p>
          </div>
          <div className='shadow-[0px_0px_10px_6px_rgba(60,113,221,0.7)] p-3 rounded-xl'>
            <h3 className="text-sm font-medium text-gray-400 ">Flex to Temp</h3>
            <p className="text-lg font-medium text-white">{result.temperature}°C</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4 p-4 border border-blue-500 rounded-lg shadow-[0px_0px_10px_4px_rgba(46,81,255,0.8)]">
        <div className="text-center  pr-4">
          <h3 className="text-sm  font-medium text-gray-400">V<sub>1</sub></h3>
          <p className="text-3xl font-bold text-blue-400">{result.v1}</p>
        </div>
        <div className="text-center ">
          <h3 className="text-sm font-medium text-gray-400">V<sub>R</sub></h3>
          <p className="text-3xl font-bold text-blue-400">{result.vr}</p>
        </div>
        <div className="text-center ">
          <h3 className="text-sm font-medium text-gray-400">V<sub>2</sub></h3>
          <p className="text-3xl font-bold text-blue-400">{result.v2}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">Takeoff Limits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-400">Max Weight</h3>
            <p className="text-lg font-medium text-white">
              {result.maxWeight.toLocaleString()} {result.weightUnit}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400">Limited By</h3>
            <p className="text-lg font-medium text-white">{result.limitedBy}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400">Green Dot</h3>
            <p className="text-lg font-medium text-white">{result.greenDot} kts</p>
          </div>
        </div>
      </div>

    </div>
    <div className="rounded-lg bg-zinc-800 border border-gray-700 overflow-hidden transition-all duration-300">
    
      {/* Existing result display */}
      <div className="p-2">
        {/* Add Runway Visualization */}
        <SliderR vSpeeds={{ v1: result.v1, vr: result.vr, v2: result.v2 }}/>
       
        <RunwayVisualization 
          runway1={ident1} 
          runway2={ident2}
          tora={result.toraLength || 9000}
          toda={result.toraLength|| 9000}
          asda={result.toraLength|| 9000}
          elevation={result.elevation || 8500}
          vSpeeds={{ v1: result.v1, vr: result.vr, v2: result.v2 }}
          wind={{ direction: result.windDirection || 0, speed: result.windSpeed || 0 }}
        />
        {/* Add WindGauge Component */}
        <WindGauge windSpeed={result.windSpeed || 0} windDirection={result.windDirection || 0} />
      </div>
    </div>
  </div>
  );
};

export default ResultsDisplay;
