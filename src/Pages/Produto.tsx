import { useParams } from 'react-router-dom';
//import useFetch from '../hooks/useFetch';
import PhotoProduct from '../components/utils/PhotoProduct';
import { SwiperSlide, Swiper, SwiperClass } from 'swiper/react';
import ScoreProduct from '../components/ListProductShow/ScoreProduct';
import React from 'react';
import { Basket, ShoppingCart, TruckTrailer } from '@phosphor-icons/react';
import useMedia from '../hooks/useMedia';
import './Produto.css';
import Reviews from '../components/Reviews/Reviews';
import { ReviewMockup } from '../utils/Mockup/ProductsCerveja';
import { ProdutoMockup } from '../utils/Mockup/ProductPromo';
import discountIcon from '../assets/imagens/Product/discount.svg';
import 'swiper/swiper-bundle.css';
import 'swiper/css';

const Produto = () => {
  //const url = useLocation();  
  const {id} = useParams(); 

  //const product = useFetch<productModal>(url.pathname);
   const product = ProdutoMockup.filter((product) => product.id == Number(id));   
  //const reviews = useFetch<reviews[]>(`/comentarios/${product.json?.id}`);
  const reviews = ReviewMockup.filter((review) => review.product === Number(id));
  const [quantity, setQuantity] = React.useState<number>(1);
  const descriptionRef = React.useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const mobile = useMedia(750);
  
  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveIndex(swiper.activeIndex);
  };

  React.useEffect(() => {
    document.title = product[0].name ? product[0].name : '';

    if(descriptionRef.current)
      descriptionRef.current.innerHTML = product[0].meta_description ? product[0].meta_description : '';
  }, [product[0]]);
  
  if (product[0]) return (
    <>
      <div className='flex gap-4 items-center mb-8 max-[750px]:flex-wrap max-[750px]:justify-center'>
        { mobile && <div className="flex justify-between items-center h-8 max-[750px]:w-full max-[750px]:flex-col-reverse max-[750px]:gap-[0.2rem] max-[750px]:h-full">
            <ScoreProduct score={product[0].score} className="scale-150 translate-x-[20px] max-[750px]:translate-x-0 max-[750px]:gap-2 max-[750px]:h-8 max-[750px]:[&>div]:gap-[0.2rem]"/>
            <p className="text-[0.8rem] font-normal text-primary">( {reviews.length} Reviews )</p>
        </div>}
        <div className="w-1/2 flex items-center justify-center flex-col max-[750px]:w-full">
          <div className="w-[330px] h-[330px] flex items-center justify-center">
              <Swiper
              onSlideChange={handleSlideChange}
              >
                <SwiperSlide>
                  <div className='relative'>
                    <PhotoProduct type='Page' color1='#FFFFFF' color2='#CECECE' shadowImage={product[0].thumbnail.shadowWidth} srcImg={product[0].thumbnail.src}/>
                    {product[0].price!==0 && <div style={{backgroundImage: `url(${discountIcon})`}} className='absolute bottom-0 h-[4rem] w-[4rem] bg-cover text-[1rem] bg-center flex items-center justify-center text-white text-[0.6rem]'>{(((product[0].priceNow*100)/product[0].price)-100).toFixed(0)}%</div>}
                  </div>
                </SwiperSlide>
                {product[0].imagens.map( (image,index) =>
                  <SwiperSlide key={index}>
                      <div className="w-full h-[337px] bg-contain bg-center bg-no-repeat block" style={{backgroundImage: `url(${image})`}}></div>
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
            <div className="swiper-pagination-perso">
                {[...Array(product[0].imagens.length+1)].map((_,index) =>
                  <div key={index} className={ `swiper-pagination-bullet h-[0.3rem]! ${activeIndex===index ? 'swiper-pagination-bullet-active w-[2.5rem]!' : 'w-[0.3rem]!'}`}></div>
                )}
            </div>
        </div>
        <div className="w-1/2 h-full px-8 flex flex-col gap-4 max-[1000px]:px-0 max-[750px]:p-0 max-[750px]:text-center max-[750px]:w-full">
          <div className="description-product-name">
            <h1 className="text-[1.8rem] leading-8 font-bold text-brand-select">{product[0].name}</h1>
            <h4 className="text-primary font-normal text-base leading-4 mt-[0.2rem]">Volume: {product[0].volume}</h4>
          </div>
          { !mobile && <div className="flex justify-between items-center h-8 max-[750px]:w-full max-[750px]:flex-col-reverse max-[750px]:gap-[0.2rem] max-[750px]:h-full">
            <ScoreProduct score={product[0].score} className="scale-150 translate-x-[20px] max-[750px]:translate-x-0 max-[750px]:gap-2 max-[750px]:h-8 max-[750px]:[&>div]:gap-[0.2rem]"/>
            <p className="text-[0.8rem] font-normal text-primary">( {reviews.length} Reviews )</p>
          </div>}
          { !mobile &&
          <div className="flex items-center justify-between">
            <div className="p-[0.5rem] flex gap-4 items-center border border-primary text-primary rounded-lg leading-[1rem] max-[750px]:rounded-[2rem] max-[750px]:text-white max-[750px]:border-white">
              <button className="text-primary hover:text-brand-dark max-[750px]:text-white" onClick={() => { if(quantity > 1 ) setQuantity(quantity-1) }}>-</button>
              <p>{quantity}</p>
              <button className="text-primary hover:text-brand-dark max-[750px]:text-white" onClick={() => setQuantity(quantity+1)}>+</button>
            </div>
            <div className="flex gap-2 items-center max-[750px]:flex-col max-[750px]:gap-0">
                {product[0].price > 0 && <h2 className='price text-[1.1rem] font-normal text-primary max-[750px]:text-white'><del>{(product[0].price*quantity).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</del></h2>}
                <h2 className='price-now text-[2rem] font-bold text-brand-dark max-[750px]:leading-6 max-[750px]:text-[1.7rem] max-[750px]:text-white'>{(product[0].priceNow*quantity).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h2>
            </div>
          </div>
          }
          <div className="flex items-center justify-between text-brand-dark">
              { !mobile && <p>Calcular Frete:</p>}
              <label htmlFor='freight' className="flex items-center justify-between p-2 gap-2 rounded-lg border border-primary max-[750px]:w-full">
                  <input className="border-none bg-transparent outline-none" type="text" id='freight' placeholder='Insirir CEP' autoComplete='false' autoSave='false'/>
                  <button className="flex items-center justify-between p-2 gap-2 bg-linear-to-r from-brand to-brand-dark rounded-lg text-white hover:bg-brand-dark"><TruckTrailer size={16} weight="fill" /></button>
              </label>
          </div>
          {!mobile &&
            <button className='w-full py-4 px-2 bg-linear-to-r from-brand to-brand-dark flex items-center justify-center gap-4 rounded-lg text-white font-normal text-base hover:bg-brand-dark'><Basket size={20} weight="fill" />Comprar</button>
          }
        </div>
        { mobile &&
        <button className='max-[750px]:fixed max-[750px]:flex max-[750px]:items-center max-[750px]:justify-between max-[750px]:bottom-6 max-[750px]:py-8 max-[750px]:px-4 max-[750px]:w-[90%] max-[750px]:bg-linear-to-l max-[750px]:from-brand max-[750px]:to-brand-dark max-[750px]:z-[100] max-[750px]:rounded-2xl'>
            <div className="flex gap-2 items-center max-[750px]:flex-col max-[750px]:gap-0">
                {product[0].price > 0 && <h2 className='price text-[1.1rem] font-normal text-primary max-[750px]:text-white'><del>{(product[0].price*quantity).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</del></h2>}
                <h2 className='price-now text-[2rem] text-brand-dark max-[750px]:leading-6 max-[750px]:text-[1.7rem] max-[750px]:text-white'>{(product[0].priceNow*quantity).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h2>
            </div>
            <div className="px-2 py-[0.2rem] flex gap-4 items-center border border-primary text-primary rounded-lg leading-[0.5rem] max-[750px]:rounded-[2rem] max-[750px]:text-white max-[750px]:border-white">
              <button className="text-primary hover:text-brand-dark max-[750px]:text-white" onClick={() => { if(quantity > 1 ) setQuantity(quantity-1) }}>-</button>
              <p>{quantity}</p>
              <button className="text-primary hover:text-brand-dark max-[750px]:text-white" onClick={() => setQuantity(quantity+1)}>+</button>
            </div>
            <button className='max-[750px]:text-brand-dark max-[750px]:flex max-[750px]:items-center max-[750px]:text-[0.8rem] max-[750px]:font-semibold max-[750px]:p-2 max-[750px]:rounded-lg max-[750px]:bg-white'><ShoppingCart weight='fill' color='var(--color-brand-dark)' size={'1.3rem'}/>Carrinho</button>
        </button>
      }
      </div>
      <div className="max-[750px]:border-t max-[750px]:border-brand-dark max-[750px]:pt-4">
        <h2 className="text-center text-[1.2rem] font-medium text-brand-dark leading-4 my-4">DESCRIÇÃO DO PRODUTO</h2>
        <div ref={descriptionRef} className="description-product-description"></div>
      </div>
      { reviews && <Reviews reviews={reviews}/> }
    </>
  )
}

export default Produto;