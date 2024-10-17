import { CaretDown } from '@phosphor-icons/react';
import './ModalPriceProducts.css'
import React from 'react';

const ModalPriceProducts = () => {
  const [animation, setAnimation] = React.useState<boolean>(false);
  const rangeInput = document.querySelectorAll<HTMLInputElement>('.modal-filter-products-ranger-input input');
  const progress = document.querySelector<HTMLDivElement>('.modal-filter-products-slider');
  const priceGap = 1000;

  function handleInput(e: InputEvent) {
    const minVal = parseInt(rangeInput[0].value);
    const maxVal = parseInt(rangeInput[1].value);


    if(maxVal - minVal < priceGap) {
      if(e.target.className == 'modal-filter-products-ranger-input-min') {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    } else {
      if(progress) {
        progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
        progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
      }
    }
  }

  React.useEffect(() => {
    rangeInput.forEach((input: HTMLInputElement) => {
      input.addEventListener('input', handleInput);
    });
  })

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
          <div className="modal-filter-products-slider">
            <div className="modal-filter-products-progress"></div>
          </div>
          <div className="modal-filter-products-ranger-input">
            <input type="range" className='modal-filter-products-ranger-input-min' min={0} max={10000} value={2500}/>
            <input type="range" className='modal-filter-products-ranger-input-max' min={0} max={10000} value={7500}/>
          </div>
          <div className='modal-filter-products-wraper'>
            <div className="modal-price-products-field">
              <div className="modal-price-products-coin">
                <span>R$</span>
              </div>
              <input type="number" className='modal-price-products-number' value={'2500'}/>
            </div>
            <div className='modal-price-products-divide'>-</div>
            <div className="modal-price-products-field">
              <div className="modal-price-products-coin">
                <span>R$</span>
              </div>
              <input type="number" className='modal-price-products-number' value={'7500'}/>
            </div>
          </div>
        </div>
    </div>
  )

}

export default ModalPriceProducts;