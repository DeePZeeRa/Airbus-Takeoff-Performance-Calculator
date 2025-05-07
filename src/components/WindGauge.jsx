import React, { useEffect, useRef } from 'react';
import anychart from 'anychart';

const WindGauge = ({ windSpeed, windDirection }) => {
  const containerRef = useRef(null);
  const gaugeRef = useRef(null);

  useEffect(() => {
    if (!gaugeRef.current) {
      const gauge = anychart.gauges.circular();
      
      gauge.fill('#27272a')
        .stroke(null)
        .padding(0)
        .margin(30)
        .startAngle(0)
        .sweepAngle(360);

      gauge.axis().labels()
        .padding(3)
        .position('outside')
        .format('{%Value}\u00B0');

      gauge.data([windDirection, windSpeed]);

      gauge.axis().scale()
        .minimum(0)
        .maximum(360)
        .ticks({ interval: 30 })
        .minorTicks({ interval: 10 });

      gauge.axis()
        .fill('#ffffff')
        .startAngle(0)
        .sweepAngle(-360)
        .width(1)
        .ticks({
          type: 'line',
          fill: '#0f0f0f',
          length: 4,
          position: 'outside',
        });

      gauge.axis(1)
        .fill('#7c868e')
        .startAngle(270)
        .radius(30)
        .sweepAngle(180)
        .width(1)
        .ticks({
          type: 'line',
          fill: '#ffffff',
          length: 4,
          position: 'outside',
        });

      gauge.axis(1).labels()
        .padding(3)
        .position('outside')
        .format('{%Value} m/s');

      gauge.axis(1).scale()
        .minimum(0)
        .maximum(25)
        .ticks({ interval: 5 })
        .minorTicks({ interval: 1 });

      gauge.marker()
        .fill('#64b5f6')
        .stroke(null)
        .size('15%')
        .zIndex(120)
        .radius('97%');

      gauge.needle()
        .fill('#1976d2')
        .stroke(null)
        .axisIndex(1)
        .startRadius('6%')
        .endRadius('38%')
        .startWidth('2%')
        .endWidth('0');

      gauge.cap()
        .radius('4%')
        .fill('#1976d2')
        .enabled(true)
        .stroke(null);

      
      gauge.container(containerRef.current);
      gauge.background().fill('#27272a'); // Set background color
      gauge.draw(); 

      gaugeRef.current = gauge;
    }

    // Update gauge data
    gaugeRef.current.data([windDirection, windSpeed]);
  }, [windSpeed, windDirection]);

  return <div ref={containerRef} style={{ width: '100%',backgroundColor:'#27272a', height: '300px' }} />;
};

export default WindGauge;
