import { useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import PhotoProduct from '../components/utils/PhotoProduct';
import { SwiperSlide, Swiper } from 'swiper/react';
import ScoreProduct from '../components/ListProductShow/ScoreProduct';
import React from 'react';
import { Basket, TruckTrailer } from '@phosphor-icons/react';
import useMedia from '../hooks/useMedia';
import './Produto.css';

const Produto = () => {
  const url = useLocation();  
  const {json} = useFetch<productModal>(url.pathname);
  const [quantity, setQuantity] = React.useState<number>(1);
  const mobile = useMedia(1000);
  const descriptionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if(descriptionRef.current)
    descriptionRef.current.innerHTML = json?.meta_description;
  }, [json]);
  
  if (json) return (
    <>
      <div className='description-product'>
        <div className="description-product-image-container">
          <div className="description-product-image">
              <Swiper>
                <SwiperSlide>
                  <PhotoProduct type='Page' color1='#FFFFFF' color2='#CECECE' shadowImage={json.thumbnail.shadowWidth} srcImg={json.thumbnail.src}/>
                  {json.price!==0 && <div className='product-modal-image-discount description'>{(((json.priceNow*100)/json.price)-100).toFixed(0)}%</div>}
                </SwiperSlide>
              </Swiper>
            </div>
        </div>
        <div className="description-product-container">
          <div className="description-product-name">
            <h1>{json?.name}</h1>
            <h4>Volume: {json?.volume}</h4>
          </div>
          <div className="description-product-score">
            <ScoreProduct score={json.score}/>
            <p>( {json.reviews} Reviews )</p>
          </div>
          <div className="description-product-price-container">
            <div className="description-product-quantity-container">
              <button onClick={() => { if(quantity > 1 ) setQuantity(quantity-1) }}>-</button>
              <p>{quantity}</p>
              <button onClick={() => setQuantity(quantity+1)}>+</button>
            </div>
            <div className="description-product-prices">
                {json.price > 0 && <h2 className='price'><del>{(json.price*quantity).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</del></h2>}
                <h2 className='price-now'>{(json.priceNow*quantity).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h2>
            </div>
          </div>
          <div className="description-product-freight-container">
              <p>Calcular Frete:</p>
              <label htmlFor='freight' className="description-product-freight">
                  <input type="text" id='freight' placeholder='Insirir CEP' autoComplete='false' autoSave='false'/>
                  <button><TruckTrailer size={16} weight="fill" /></button>
              </label>
          </div>
          {!mobile && 
            <button className='description-product-buy'><Basket size={20} weight="fill" />Comprar</button>
          }
        </div>
      </div>
      <div className="description-product-description-container">
        <h2 className="description-product-title">DESCRIÇÃO DO PRODUTO</h2>
        <div ref={descriptionRef} className="description-product-description"></div>
      </div>
    </>
  )
}

export default Produto;