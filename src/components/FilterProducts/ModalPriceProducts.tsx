import { CaretDown } from '@phosphor-icons/react';
import './ModalPriceProducts.css'
import React from 'react';
import RangeSlider from '../utils/RangeSlider';

const ModalPriceProducts = () => {
  const [animation, setAnimation] = React.useState<boolean>(false);
  const [minPrice, setMinPrice] = React.useState<number>(0);
  const [maxPrice, setMaxPrice] = React.useState<number>(0);

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
          <RangeSlider min={0}  max={1000} onChange={({ min, max }) => {setMinPrice(min); setMaxPrice(max);}}/>
          <div className='modal-filter-products-wraper'>
            <div className="modal-price-products-field">
              <div className="modal-price-products-coin">
                <span>R$</span>
              </div>
              <input type="number" className='modal-price-products-number' value={minPrice}/>
            </div>
            <div className='modal-price-products-divide'>-</div>
            <div className="modal-price-products-field">
              <div className="modal-price-products-coin">
                <span>R$</span>
              </div>
              <input type="number" className='modal-price-products-number' value={maxPrice}/>
            </div>
          </div>
        </div>
    </div>
  )

}

export default ModalPriceProducts;