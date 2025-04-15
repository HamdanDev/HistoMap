import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './styles.css';

const TimelineSlider = ({ minYear, maxYear, currentYear, onChange }) => {
  return (
    <div style={{ margin: '2rem', padding: '0 1rem' }}>
      <h2 style={{ textAlign: 'center' }}>🕰️ Year: {currentYear}</h2>
      <Slider
        min={minYear}
        max={maxYear}
        value={currentYear}
        onChange={onChange}
        step={1}

      />
    </div>
  );
};

export default TimelineSlider;
