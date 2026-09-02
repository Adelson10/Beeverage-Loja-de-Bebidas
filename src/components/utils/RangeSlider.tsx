// RangeSlider.css now only holds ::-webkit-slider-thumb / ::-moz-range-thumb rules,
// which cannot be expressed as Tailwind utility classes.
import './RangeSlider.css';
import useMedia from '../../hooks/useMedia';
import React from 'react';

const RangeSlider = ({min, max, onChange}: {min: number, max: number, onChange: any}) => {
  const [minVal, setMinVal] = React.useState(min);
  const [maxVal, setMaxVal] = React.useState(max);
  const minValRef = React.useRef(min);
  const maxValRef = React.useRef(max);
  const range = React.useRef<HTMLDivElement>(null);
  const mobile = useMedia(1000);

  const getPercent = React.useCallback( (value: number) => 
        Math.round(((value - min) / (max - min)) * 100),
      [min, max]
    );
  
    React.useEffect(() => {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxValRef.current);
  
      if (range.current) {
        range.current.style.left = `${!mobile ? minPercent+3 : minPercent+1}%`;
        range.current.style.width = `${((!mobile ? maxPercent*0.94 : maxPercent*0.98 ) - minPercent)}%`;
      }
    }, [minVal, getPercent]);
  
    React.useEffect(() => {
      const minPercent = getPercent(minValRef.current);
      const maxPercent = getPercent(maxVal);
  
      if (range.current) {
        range.current.style.width = `${(!mobile ? maxPercent*0.94 : maxPercent*0.98) - minPercent}%`;
      }
    }, [maxVal, getPercent]);
  
    React.useEffect(() => {
      onChange({ min: minVal, max: maxVal , setMin: setMinVal, setMax: setMaxVal});
    }, [minVal, maxVal]);
  
    return (
      <div className="h-4 flex items-center justify-center">
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
          className="thumb pointer-events-none absolute h-0 w-[200px] outline-none appearance-none [-webkit-appearance:none] z-[3]"
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
          className="thumb pointer-events-none absolute h-0 w-[200px] outline-none appearance-none [-webkit-appearance:none] z-[4]"
        />

        <div className="relative w-[200px] bottom-[7px] max-[1000px]:w-full">
          <div className="absolute rounded-[2px] h-2 bg-white py-1 px-0 w-full z-[1]" />
          <div ref={range} className="absolute rounded-[2px] h-2 top-1 bg-brand-dark z-[2]" />
        </div>
      </div>
    );
  }

  export default RangeSlider;