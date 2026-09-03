import { CaretDown } from '@phosphor-icons/react';
import React from 'react';
import RangeSlider from '../utils/RangeSlider';
import { useSearchParams } from 'react-router-dom';

const useDebounce = (callback: Function, delay: number) => {
  const [timeoutId, setTimeoutId] = React.useState<number | null>(null);

  const debounce = (...args: any) => {
    if (timeoutId) clearTimeout(timeoutId);
    const id = setTimeout(() => {
      callback(...args);
    }, delay);
    setTimeoutId(id);
  };

  return debounce;
};

const ModalPriceProducts = () => {
  const [animation, setAnimation] = React.useState<boolean>(false);
  const [minPrice, setMinPrice] = React.useState<number>(0);
  const [maxPrice, setMaxPrice] = React.useState<number>(0);
  const [filter, setFilter] = useSearchParams();
  const [firstLoading, setFirstLoading] = React.useState<Boolean>(false);
  const setSliderMinRef = React.useRef<React.Dispatch<React.SetStateAction<number>> | null>(null);
  const setSliderMaxRef = React.useRef<React.Dispatch<React.SetStateAction<number>> | null>(null);
  const key = 'price';
  const maxValue = 1000;
  const minValue = 0;

  const setSearchParams = (min: number, max: number) => {
    setFilter((filter) => {
      const values = [min,max];

      if (values[0] >= minValue && values[1] < maxValue) {
        filter.set(key, values.toString());
      } else {
          filter.delete(key);
      }

      return filter;
    });
  };

  const handleRangeChange = useDebounce((min: number, max: number) => {
    setSearchParams(min, max);
  }, 200);

  const handleChange = ({ min, max , setMin, setMax}: {min: number, max: number, setMin: React.Dispatch<React.SetStateAction<number>>, setMax: React.Dispatch<React.SetStateAction<number>> }) =>
    {
      setSliderMinRef.current = setMin;
      setSliderMaxRef.current = setMax;

      if(filter.get(key) && !firstLoading) {
        const value = filter.get(key)?.split(',');
        setFirstLoading(true);
        if(value) {
          setMin(Number(value[0]));
          setMax(Number(value[1]));
          setMinPrice(Number(value[0]));
          setMaxPrice(Number(value[1]));
        }
      } else {
        setMinPrice(min);
        setMaxPrice(max);
        handleRangeChange(min,max);
      }
    }

  const commitMinPrice = (value: number) => {
    const clamped = Math.min(Math.max(value || minValue, minValue), maxPrice - 1);
    setMinPrice(clamped);
    setSliderMinRef.current?.(clamped);
    setSearchParams(clamped, maxPrice);
  };

  const commitMaxPrice = (value: number) => {
    const clamped = Math.max(Math.min(value || maxValue, maxValue), minPrice + 1);
    setMaxPrice(clamped);
    setSliderMaxRef.current?.(clamped);
    setSearchParams(minPrice, clamped);
  };

  return (
    <div className="py-[.6rem] px-2 rounded-[.8rem] bg-bg-secundary">
        <div className="flex items-center justify-between">
            <h1 className="text-base font-medium text-brand-dark">Preço</h1>
            <button className="text-brand-dark"
            onClick={() => setAnimation((n) => !n)}>
                <CaretDown weight="fill" size='1.2rem'/>
            </button>
        </div>
        <div className={`flex flex-col gap-[.4rem] relative overflow-hidden transition-[max-height] duration-500 ease ${ animation ? 'max-h-0' : 'max-h-[200px]'}`}>
          <RangeSlider min={minValue}  max={maxValue} onChange={handleChange}/>
          <div className='flex items-center justify-between gap-[.6rem]'>
            <div className="border border-brand-dark flex rounded-[.2rem]">
              <div className="border-r border-brand-dark inline-block px-[.4rem] text-brand-dark font-semibold">
                <span className='text-[.8rem]'>R$</span>
              </div>
              <input
                type="number"
                inputMode="numeric"
                min={minValue}
                max={maxValue}
                value={minPrice}
                onChange={(event) => setMinPrice(Number(event.target.value))}
                onBlur={(event) => commitMinPrice(Number(event.target.value))}
                onKeyDown={(event) => { if (event.key === 'Enter') event.currentTarget.blur(); }}
                className='w-full py-[.2rem] px-[.4rem] bg-transparent border-none text-[.8rem] text-secundary outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
              />
            </div>
            <div className='text-brand-dark'>-</div>
            <div className="border border-brand-dark flex rounded-[.2rem]">
              <div className="border-r border-brand-dark inline-block px-[.4rem] text-brand-dark font-semibold">
                <span className='text-[.8rem]'>R$</span>
              </div>
              <input
                type="number"
                inputMode="numeric"
                min={minValue}
                max={maxValue}
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
                onBlur={(event) => commitMaxPrice(Number(event.target.value))}
                onKeyDown={(event) => { if (event.key === 'Enter') event.currentTarget.blur(); }}
                className='w-full py-[.2rem] px-[.4rem] bg-transparent border-none text-[.8rem] text-secundary outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
              />
            </div>
          </div>
        </div>
    </div>
  )

}

export default ModalPriceProducts;