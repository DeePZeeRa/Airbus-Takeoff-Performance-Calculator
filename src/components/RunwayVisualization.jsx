import React from 'react';
import { Result } from 'postcss';
const RunwayVisualization = ({ tora, toda, asda, wind, runway1,runway2 }) => {
  return (
    <div className="bg-zinc-800 rounded-lg shadow-lg">
      <div className="relative w-full h-[150px] bg-[#1c1920] border-[4px] border-[#c4c4c4] overflow-hidden ">
        {/* Runway Numbers */}
        <div className="absolute left-14 top-1/2 -translate-y-1/2 text-white text-4xl font-bold rotate-90">09</div>
        <div className="absolute right-14 top-1/2 -translate-y-1/2 text-white text-4xl font-bold -rotate-90">27</div>

        {/* Centerline */}
        <div className="absolute top-1/2 left-2 w-full h-1 -translate-y-1/2 bg-[repeating-linear-gradient(to_right,white,white_10px,transparent_20px,transparent_40px)]"></div>

        {/* Threshold Markings (left) */}
        <div className="absolute left-0 top-[10px] w-[60px] h-[110px] flex flex-col justify-between items-start pl-2">
          <div className="w-[40px] h-[8px] bg-white"></div>
          <div className="w-[40px] h-[8px] bg-white"></div>
          <div className="w-[40px] h-[8px] bg-white"></div>
          <div className="w-[40px] h-[8px] bg-white"></div>
        </div>

        {/* Threshold Markings (right) */}
        <div className="absolute right-0 top-[10px] w-[60px] h-[110px] flex flex-col justify-between items-end pr-2">
          <div className="w-[40px] h-[8px] bg-white"></div>
          <div className="w-[40px] h-[8px] bg-white"></div>
          <div className="w-[40px] h-[8px] bg-white"></div>
          <div className="w-[40px] h-[8px] bg-white"></div>
        </div>

        {/* Aiming Point Bars */}
        <div className="absolute top-[30%] left-[110px] w-[30px] h-[15px] bg-white"></div>
        <div className="absolute top-[30%] right-[110px] w-[30px] h-[15px] bg-white"></div>
        <div className="absolute bottom-[30%] left-[110px] w-[30px] h-[15px] bg-white"></div>
        <div className="absolute bottom-[30%] right-[110px] w-[30px] h-[15px] bg-white"></div>
      </div>

      {/* Wind Information */}
      <div className="mt-4 text-center text-white">
        <h3 className="text-sm font-medium">Wind</h3>
        <p className="text-lg font-bold">{wind.direction}° / {wind.speed} kts</p>
      </div>

      {/* Runway Data */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center text-white">
        <div>
          <h3 className="text-sm font-medium">TORA</h3>
          <p className="text-lg font-bold">{tora} ft</p>
        </div>
        <div>
          <h3 className="text-sm font-medium">TODA</h3>
          <p className="text-lg font-bold">{toda} ft</p>
        </div>
        <div>
          <h3 className="text-sm font-medium">ASDA</h3>
          <p className="text-lg font-bold">{asda} ft</p>
        </div>
        
       
      </div>

      {/* V-Speeds
      <div className="mt-4 grid grid-cols-3 gap-4 text-center text-white">
        <div>
          <h3 className="text-sm font-medium">V<sub>1</sub></h3>
          <p className="text-lg font-bold text-blue-400">{vSpeeds.v1} kts</p>
        </div>
        <div>
          <h3 className="text-sm font-medium">V<sub>R</sub></h3>
          <p className="text-lg font-bold text-blue-400">{vSpeeds.vr} kts</p>
        </div>
        <div>
          <h3 className="text-sm font-medium">V<sub>2</sub></h3>
          <p className="text-lg font-bold text-blue-400">{vSpeeds.v2} kts</p>
        </div>
      </div> */}
    </div>
  );
};

export default RunwayVisualization;