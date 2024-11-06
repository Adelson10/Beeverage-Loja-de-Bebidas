import { useLocation, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import PhotoProduct from '../components/utils/PhotoProduct';
import { SwiperSlide, Swiper } from 'swiper/react';
import ScoreProduct from '../components/ListProductShow/ScoreProduct';
import React from 'react';
import { Basket, ShoppingCart, TruckTrailer } from '@phosphor-icons/react';
import useMedia from '../hooks/useMedia';
import './Produto.css';
import Reviews from '../components/Reviews/Reviews';
import { ReviewMockup } from '../utils/Mockup/ProductsCerveja';
import { ProdutoMockup } from '../utils/Mockup/ProductPromo';

const Produto = () => {
  const url = useLocation();  
  const {id} = useParams(); 

  //const product = useFetch<productModal>(url.pathname);
   const product = ProdutoMockup.filter((product) => product.id == Number(id));
   console.log(product);
   
  //const reviews = useFetch<reviews[]>(`/comentarios/${product.json?.id}`);
  const reviews = ReviewMockup;
  const [quantity, setQuantity] = React.useState<number>(1);
  const mobile = useMedia(1000);
  const descriptionRef = React.useRef<HTMLDivElement | null>(null);
  const tablet = useMedia(750);

  React.useEffect(() => {
    document.title = product[0].name ? product[0].name : '';

    if(descriptionRef.current)
      descriptionRef.current.innerHTML = product[0].meta_description ? product[0].meta_description : '';
  }, [product[0]]);
  
  if (product[0]) return (
    <>
      <div className='description-product'>
        { tablet && <div className="description-product-score">
            <ScoreProduct score={product[0].score}/>
            <p>( {reviews.length} Reviews )</p>
        </div>}
        <div className="description-product-image-container">
          <div className="description-product-image">
              <Swiper>
                <SwiperSlide>
                  <div className='Slide-Thumbnail'>
                    <PhotoProduct type='Page' color1='#FFFFFF' color2='#CECECE' shadowImage={product[0].thumbnail.shadowWidth} srcImg={product[0].thumbnail.src}/>
                    {product[0].price!==0 && <div className='product-modal-image-discount description'>{(((product[0].priceNow*100)/product[0].price)-100).toFixed(0)}%</div>}
                  </div>
                </SwiperSlide>
                {product[0].imagens.map( () => 
                  <SwiperSlide>
                      <div className="product-modal-imagem"></div>
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
        </div>
        <div className="description-product-container">
          <div className="description-product-name">
            <h1>{product[0].name}</h1>
            <h4>Volume: {product[0].volume}</h4>
          </div>
          { !tablet && <div className="description-product-score">
            <ScoreProduct score={product[0].score}/>
            <p>( {reviews.length} Reviews )</p>
          </div>}
          { !tablet && 
          <div className="description-product-price-container">
            <div className="description-product-quantity-container">
              <button onClick={() => { if(quantity > 1 ) setQuantity(quantity-1) }}>-</button>
              <p>{quantity}</p>
              <button onClick={() => setQuantity(quantity+1)}>+</button>
            </div>
            <div className="description-product-prices">
                {product[0].price > 0 && <h2 className='price'><del>{(product[0].price*quantity).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</del></h2>}
                <h2 className='price-now'>{(product[0].priceNow*quantity).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h2>
            </div>
          </div>
          }
          <div className="description-product-freight-container">
              { !tablet && <p>Calcular Frete:</p>}
              <label htmlFor='freight' className="description-product-freight">
                  <input type="text" id='freight' placeholder='Insirir CEP' autoComplete='false' autoSave='false'/>
                  <button><TruckTrailer size={16} weight="fill" /></button>
              </label>
          </div>
          {!mobile && 
            <button className='description-product-buy'><Basket size={20} weight="fill" />Comprar</button>
          }
        </div>
        { tablet && 
        <button className='button-product'>
            <div className="description-product-prices">
                {product[0].price > 0 && <h2 className='price'><del>{(product[0].price*quantity).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</del></h2>}
                <h2 className='price-now'>{(product[0].priceNow*quantity).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h2>
            </div>
            <div className="description-product-quantity-container">
              <button onClick={() => { if(quantity > 1 ) setQuantity(quantity-1) }}>-</button>
              <p>{quantity}</p>
              <button onClick={() => setQuantity(quantity+1)}>+</button>
            </div>
            <button className='button-product-buy'><ShoppingCart weight='fill' color='var(--brand-dark)' size={'1.3rem'}/>Carrinho</button>
        </button>
      }
      </div>
      <div className="description-product-description-container">
        <h2 className="description-product-title">DESCRIÇÃO DO PRODUTO</h2>
        <div ref={descriptionRef} className="description-product-description"></div>
      </div>
      { reviews && <Reviews reviews={reviews}/> }
    </>
  )
}

export default Produto;