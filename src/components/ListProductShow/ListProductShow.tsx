import PhotoProduct from '../utils/PhotoProduct';
import ScoreProduct from './ScoreProduct';
import './ListProductShow.css';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import useMedia from '../../hooks/useMedia';

interface ListProductShowProps {
    title: string;
    productModal: productModal[];
}

const ListProductShow = ({title, productModal}: ListProductShowProps) => {
  const Tablet = useMedia(1000);
  const Mobile = useMedia(600);
  
  return (
    <div className='ListProductShow'>
        <h1 className='ListProductShow_Title'>{title}</h1>
        <Swiper style={{overflow: 'visible'}}
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
    </div>
  )
}

export default ListProductShow;