// RangeSlider.css now only holds ::-webkit-slider-thumb / ::-moz-range-thumb rules,
// which cannot be expressed as Tailwind utility classes
import './RangeSlider.css';
import React from 'react';

const RangeSlider = ({min, max, onChange}: {min: number, max: number, onChange: any}) => {
  const [minVal, setMinVal] = React.useState(min);
  const [maxVal, setMaxVal] = React.useState(max);
  const minValRef = React.useRef(min);
  const maxValRef = React.useRef(max);
  const range = React.useRef<HTMLDivElement>(null);

  const getPercent = React.useCallback( (value: number) =>
        Math.round(((value - min) / (max - min)) * 100),
      [min, max]
    );

    React.useEffect(() => {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxValRef.current);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }, [minVal, getPercent]);

    React.useEffect(() => {
      const minPercent = getPercent(minValRef.current);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }, [maxVal, getPercent]);

    React.useEffect(() => {
      onChange({ min: minVal, max: maxVal , setMin: setMinVal, setMax: setMaxVal});
    }, [minVal, maxVal]);

    return (
      <div className="relative w-[180px] h-4 max-[1000px]:w-full">
        <div className="absolute top-1/2 -translate-y-1/2 h-2 w-full rounded-[2px] bg-white z-[1]" />
        <div ref={range} className="absolute top-1/2 -translate-y-1/2 h-2 rounded-[2px] bg-brand-dark z-[2]" />

        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
          }}
          className="thumb pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 h-0 w-full outline-none appearance-none [-webkit-appearance:none] z-[3]"
          style={{ zIndex: minVal > max - 100 ? "5" : undefined}}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          className="thumb pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 h-0 w-full outline-none appearance-none [-webkit-appearance:none] z-[4]"
        />
      </div>
    );
  }

  export default RangeSlider;