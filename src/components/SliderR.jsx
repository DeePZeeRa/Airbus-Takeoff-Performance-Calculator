import React, { useEffect, useRef, useState } from 'react';

const RunwaySlider = ({ vSpeeds }) => {
  // Define slider range
  const start = 0;
  const end = 180;

  // Use vSpeeds.v1 as initial value if available, else start
  const [value, setValue] = useState(vSpeeds?.v1 ?? start);
  const sliderRef = useRef(null);
  const sliderLabelRef = useRef(null);
  const v1Ref = useRef(null);
  const vrRef = useRef(null);
  const v2Ref = useRef(null);

  const setLabelPosition = (labelRef, val) => {
    if (!sliderRef.current || !labelRef.current) return;

    const sliderWidth = sliderRef.current.offsetWidth;
    const labelWidth = labelRef.current.offsetWidth;
    const percent = (val - start) / (end - start);
    const offset = percent * sliderWidth - labelWidth / 2;

    labelRef.current.style.left = `${offset}px`;
  };

  useEffect(() => {
    setLabelPosition(sliderLabelRef, value);
    if (vSpeeds) {
      setLabelPosition(v1Ref, vSpeeds.v1);
      setLabelPosition(vrRef, vSpeeds.vr);
      setLabelPosition(v2Ref, vSpeeds.v2);
    }
  }, [value, vSpeeds, start, end]);

  // Update slider value if vSpeeds.v1 changes
  useEffect(() => {
    if (vSpeeds?.v1 !== undefined) {
      setValue(vSpeeds.v1);
    }
  }, [vSpeeds]);

  if (!vSpeeds) return null;

  return (
    <div className="w-full px-1  relative mt-[30px] flex">
      <div className=" w-full  h-20">

        {/* Runway Line */}
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-black transform -translate-y-1/2"></div>

        {/* Marker Labels */}
        <div ref={v1Ref} className="absolute  text-xs top-12 px-2 py-1 rounded bg-black text-white">V1</div>
        <div ref={vrRef} className="absolute  text-xs top-12 px-2 py-1 rounded bg-black text-white">VR</div>
        <div ref={v2Ref} className="absolute  text-xs top-12 px-2 py-1 rounded bg-black text-white">V2</div>

        {/* Slider */}
        <div className="relative mt-8">
          <input
            ref={sliderRef}
            type="range"
            min={start}
            max={end}
            value={value} // <-- FIXED: was value={0}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full appearance-none bg-transparent"
          />
          
        </div>

        {/* Start / End Labels */}
        <div className="flex justify-between my-0 text-sm text-white">
          <span>{`Start`}</span>
          <span>{`End`}</span>
        </div>
      </div>
    </div>
  );
};

export default RunwaySlider;
