import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Timeline = ({
  year,
  previewYear,
  minYear,
  maxYear,
  onYearChange,
  onPreviewYearChange,
}) => (
  <section className="timeline glass-panel">
    <div className="timeline-meta">
      <span className="eyebrow">Timeline</span>
      <strong>{previewYear}</strong>
      <span>
        {minYear} - {maxYear}
      </span>
    </div>
    <Slider
      min={minYear}
      max={maxYear}
      value={previewYear}
      onChange={onPreviewYearChange}
      onAfterChange={onYearChange}
    />
    <div className="timeline-current">
      Data centered on <strong>{year}</strong>
    </div>
  </section>
);

export default Timeline;
