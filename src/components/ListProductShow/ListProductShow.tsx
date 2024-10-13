import PhotoProduct from '../utils/PhotoProduct';
import ScoreProduct from './ScoreProduct';
import './ListProductShow.css';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import useMedia from '../../hooks/useMedia';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import React from 'react';
import { Swiper as SwiperClass } from 'swiper';

interface ListProductShowProps {
    title: string;
    productModal: productModal[];
}

const ListProductShow = ({title, productModal}: ListProductShowProps) => {
  const Tablet = useMedia(1000);
  const Mobile = useMedia(600);
  const [swiperInstance, setSwiperInstance] = React.useState<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = React.useState<boolean>(true);
  const [isEnd, setIsEnd] = React.useState<boolean>(false);

  const handleSlideChange = (swiper: SwiperClass) => {
    setIsBeginning(swiper.isBeginning); // Verifica se está no primeiro slide
    setIsEnd(swiper.isEnd);
  };
  
  return (
    <div className='ListProductShow'>
      <div className="swiper-list-products">
        <h1 className='ListProductShow_Title'>{title}</h1>
        <Swiper
        onSwiper={setSwiperInstance}
        onSlideChange={handleSlideChange}
        style={{overflow: 'visible'}}
        spaceBetween={8}
        slidesPerView={Tablet ? Mobile ? 2 : 4 : 5}>
            {productModal.map((product) => 
                <SwiperSlide key={product.code}>
                  <Link id={product.code} to={product.categoriaSrc} className='ProductModal'>
                    <div className="ProductModalBoxImage">
                        <PhotoProduct
                        color1='#FFFFFF'
                        color2='#CECECE'
                        shadowImage={`${product.image.shadowWidth}px`}
                        srcImg={product.image.src}/>
                        {product.price!==0 && <div className='ProductModal_Image_Discount'>{(((product.priceNow*100)/product.price)-100).toFixed(0)}%</div>}
                    </div>
                    <ScoreProduct score={product.score}/>
                    <h3>{product.name}</h3>
                    <h4 className="ProductModal_Volume"><strong>Volume:</strong> {product.volume}</h4>
                    <div className='ProductModal_Prices'>
                        { product.price>0 && <h2 className="price"><del>{product.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</del></h2>}
                        <h2 className="priceNow">{product.priceNow.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h2>
                    </div>
                  </Link>
                </SwiperSlide>
            )}
        </Swiper>
        <div className="switer-controller">
              <button style={{width: 'auto', visibility: isBeginning ? 'hidden' : 'visible'}} className='swiper-button-prev-custom list-product' onClick={() => swiperInstance?.slidePrev()} disabled={isBeginning} >
                  <CaretLeft weight='fill' size={'1.5rem'}/>
              </button>
              <button style={{width: 'auto', visibility: isEnd ? 'hidden' : 'visible'}} className='swiper-button-next-custom list-product' onClick={() => swiperInstance?.slideNext()}>
                <CaretRight weight='fill'size={'1.5rem'}/>
              </button>
              <div className="swiper-pagination"></div>
          </div>
        </div>
    </div>
  )
}

export default ListProductShow;