import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './styles.css';

const TimelineSlider = ({ minYear, maxYear, currentYear, onChange,setTempYear }) => {
  return (

      <Slider
        min={minYear}
        max={maxYear}
        value={currentYear}
        onChange={(val) => setTempYear(val)}     // live visual feedback
        onAfterChange={(val) => onChange(val)}   // API fetch only once
      />
  );
};

export default TimelineSlider;
