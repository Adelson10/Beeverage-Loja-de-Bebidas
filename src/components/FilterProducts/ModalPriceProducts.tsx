import { CaretDown } from '@phosphor-icons/react';
import './ModalPriceProducts.css'
import React from 'react';
import RangeSlider from '../utils/RangeSlider';
import { useSearchParams } from 'react-router-dom';

const useDebounce = (callback, delay) => {
  const [timeoutId, setTimeoutId] = React.useState(null);

  const debounce = (...args) => {
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
  }, 300);

  const handleChange = ({ min, max , setMin, setMax}: {min: number, max: number, setMin: React.Dispatch<React.SetStateAction<number>>, setMax: React.Dispatch<React.SetStateAction<number>> }) => 
    {
      if(filter.get(key)) {
        const value = filter.get(key)?.split(',');
        setMin(value[0]);
        setMax(value[1]);
        setMinPrice(value[0]);
        setMaxPrice(value[1]);        
      } else {
        setMinPrice(min);
        setMaxPrice(max);
        handleRangeChange(min,max);
      }
    }

  return (
    <div className="modal-filter-products-container">
        <div className="modal-filter-products-title-container">
            <h1 className="modal-filter-products-title">Preço</h1>
            <button className="modal-filter-products-title-close"
            onClick={() => setAnimation((n) => !n)}>
                <CaretDown weight="fill" size='1.2rem'/>
            </button>
        </div>
        <div className={`modal-filter-products-wraper-container ${ animation ? 'hidden' : ''}`}>
          <RangeSlider min={minValue}  max={maxValue} onChange={handleChange}/>
          <div className='modal-filter-products-wraper'>
            <div className="modal-price-products-field">
              <div className="modal-price-products-coin">
                <span>R$</span>
              </div>
              <span className='modal-price-products-number'>{minPrice}</span>
            </div>
            <div className='modal-price-products-divide'>-</div>
            <div className="modal-price-products-field">
              <div className="modal-price-products-coin">
                <span>R$</span>
              </div>
              <span className='modal-price-products-number'>{maxPrice}</span>
            </div>
          </div>
        </div>
    </div>
  )

}

export default ModalPriceProducts;