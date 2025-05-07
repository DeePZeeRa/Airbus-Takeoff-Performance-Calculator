import React, { useState, useEffect } from 'react';
import { Plane, AlertCircle, Sun, Moon } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AircraftSelector from './components/AircraftSelector';
import AirportData from './components/AirportData';
import TakeoffParams from './components/TakeoffParams';
import WeatherConditions from './components/WeatherConditions';
import CalculationOptions from './components/CalculationOptions';
import ResultsDisplay from './components/ResultsDisplay';

import { calculateTakeoffPerformance } from './services/calculationService';
import RunwayVisualization from './components/RunwayVisualization';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  
  // Aircraft selection
  const [aircraftType, setAircraftType] = useState('');
  const [aircraftVariant, setAircraftVariant] = useState('default');
  const [engineType, setEngineType] = useState('cfm56-5b4');

  // Airport and runway data
  const [icaoCode, setIcaoCode] = useState('');
  const [runway, setRunway] = useState('');
  const [toraLength, setToraLength] = useState(9000);
  const [lengthUnit, setLengthUnit] = useState('feet');
  const [weightUnit, setWeightUnit] = useState('kg');

  // Takeoff parameters
  const [takeoffWeight, setTakeoffWeight] = useState();
  const [flapSetting, setFlapSetting] = useState('1');
  const [thrustSetting, setThrustSetting] = useState('FLEX');
  const [bleedSetting, setBleedSetting] = useState('Auto');
  const [antiIceSetting, setAntiIceSetting] = useState('Auto');

  // Weather conditions
  const [wind, setWind] = useState('000/00');
  const [temperature, setTemperature] = useState(15);
  const [pressure, setPressure] = useState(1013);
  const [surfaceCondition, setSurfaceCondition] = useState('Dry');

  // Calculation options
  const [useFlexTemp, setUseFlexTemp] = useState(true);
  const [useImprovedClimb, setUseImprovedClimb] = useState(true);

  // Results
  const [calculationResult, setCalculationResult] = useState(null);
  const [showRawOutput, setShowRawOutput] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // give small modal for weather data success
  const handleWeatherLoaded = () => {
    toast.success('Weather data loaded successfully!', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const handleCalculate = () => {
    if (!icaoCode) {
      toast.error('Please enter an airport ICAO code', {
        position: 'top-right',
      });
      return;
    }

    if (!runway) {
      toast.error('Please select a runway', {
        position: 'top-right',
      });
      return;
    }

    if (!takeoffWeight || takeoffWeight <= 0) {
      toast.error('Please enter a valid takeoff weight', {
        position: 'top-right',
      });
      return;
    }

    const params = {
      aircraftType,
      aircraftVariant,
      engineType,
      airport: icaoCode,
      runway,
      toraLength,
      unit: lengthUnit,
      weightUnit,
      takeoffWeight,
      flapSetting,
      thrustSetting,
      bleedSetting,
      antiIceSetting,
      windDirection: parseInt(wind.split('/')[0], 10) || 0,
      windSpeed: parseInt(wind.split('/')[1], 10) || 0,
      temperature,
      pressure,
      surfaceCondition,
      useFlexTemp,
      useImprovedClimb,
      ident1: runway.ident1, // Pass ident1
      ident2: runway.ident2, // Pass ident2
    };

    const result = calculateTakeoffPerformance(params);
    setCalculationResult(result);

    if (result.status === 'warning') {
      toast.warning(result.message, {
        position: 'top-right',
      });
    } else if (result.status === 'error') {
      toast.error(result.message, {
        position: 'top-right',
      });
    } else {
      toast.success('Calculation completed successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const toggleOutputFormat = () => {
    setShowRawOutput(!showRawOutput);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#02092c] text-white' : 'bg-blue-200 text-gray-900'} p-4 md:p-6`}>
      <ToastContainer theme={theme} />
      
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Plane className={`${theme === 'dark' ? 'text-blue-500' : 'text-blue-600'} mr-3`} size={28} />
            <h1 className="text-[44px] font-extrabold capatalize"><span className="text-blue-800">Airbus Family</span> Takeoff Performance Calculator</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} transition-colors`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className={`hidden md:flex items-center space-x-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800 '} text-sm font-medium`}>
              <span>CFM56/LEAP & IAE Engines</span>
              <span>|</span>
              <span>A320CEO/NEO</span>
              
              
            </div>
            <img src="https://cdn6.aptoide.com/imgs/7/a/d/7ad2a1a777882731a7a5922f4244ea10_icon.png" alt="A320" className="w-16 h-16 object-cover hidden lg:flex" />
            
          </div>
          
        </div>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-800 '} font-medium mt-1 ml-8`}>
          Calculate V-speeds and performance limitations for Airbus A320 takeoff operations
        </p>
        
      </header>

      <div className="grid gap-7">
        <section className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-lg`}>
          <h2 className="text-lg font-bold mb-4">Aircraft Configuration</h2>
          <AircraftSelector
            selectedType={aircraftType}
            selectedVariant={aircraftVariant}
            onTypeChange={setAircraftType}
            onVariantChange={setAircraftVariant}
            theme={theme}
          />
        </section>

        <section className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-lg`}>
          <h2 className="text-lg font-bold mb-4">Airport & Runway</h2>
          <AirportData
            icaoCode={icaoCode}
            selectedRunway={runway}
            toraLength={toraLength}
            lengthUnit={lengthUnit}
            weightUnit={weightUnit}
            onIcaoChange={setIcaoCode}
            onRunwayChange={setRunway}
            onToraLengthChange={setToraLength}
            onLengthUnitChange={setLengthUnit}
            onWeightUnitChange={setWeightUnit}
            theme={theme}
          />
        </section>

        <section className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-lg`}>
          <h2 className="text-lg font-bold mb-4">Takeoff Parameters</h2>
          <TakeoffParams
            takeoffWeight={takeoffWeight}
            flapSetting={flapSetting}
            thrustSetting={thrustSetting}
            bleedSetting={bleedSetting}
            antiIceSetting={antiIceSetting}
            weightUnit={weightUnit}
            onWeightChange={setTakeoffWeight}
            onFlapSettingChange={setFlapSetting}
            onThrustSettingChange={setThrustSetting}
            onBleedSettingChange={setBleedSetting}
            onAntiIceSettingChange={setAntiIceSetting}
            theme={theme}
          />
        </section>

        <section className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-lg`}>
          <WeatherConditions
            icaoCode={icaoCode}
            wind={wind}
            temperature={temperature}
            pressure={pressure}
            surfaceCondition={surfaceCondition}
            onWindChange={setWind}
            onTemperatureChange={setTemperature}
            onPressureChange={setPressure}
            onSurfaceConditionChange={setSurfaceCondition}
            onWeatherLoaded={handleWeatherLoaded}
            theme={theme}
          />
        </section>

        <section className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-lg`}>
          <h2 className="text-lg font-bold mb-4">Advanced Options</h2>
          <CalculationOptions
            useFlexTemp={useFlexTemp}
            useImprovedClimb={useImprovedClimb}
            onFlexTempChange={setUseFlexTemp}
            onImprovedClimbChange={setUseImprovedClimb}
            theme={theme}
          />
        </section>

        <div className="flex justify-center ">
          <button
            className="bg-blue-600 hover:bg-cyan-700 hover:shadow-lg hover:shadow-neutral-900 text-white px-6 py-3 rounded-lg text-lg font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all flex items-center"
            onClick={handleCalculate}
          >
            <Plane className="mr-2" size={20} />
            Calculate
          </button>
        </div>

        {calculationResult && (
          <section className="mt-4">
            <ResultsDisplay 
              result={calculationResult} 
              showRawOutput={showRawOutput}
              onToggleOutput={toggleOutputFormat}
              theme={theme}
              ident1={runway.ident1} // Pass ident1
              ident2={runway.ident2} // Pass ident2
            />
          </section>
        )}

        <footer className={`mt-6 border-t ${theme === 'dark' ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-600'} pt-4 text-center text-sm`}>
          <div className="flex items-center justify-center mb-2">
            <AlertCircle size={16} className="mr-1" />
            <p>This calculator is for Simulation purpose. There may be some calculation deviation. Dont expect 100% accurate calculation as it is build by some Random documentation</p>
          </div>
          <p className='mb-1'>Uses METAR data from AVWX API. Done by Deepayan Das</p>
          <p>Tech: Reactjs, lucide react, jsx, tailwind.css</p>
        </footer>
      </div>
    </div>
  );
}

export default App;