import { useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import PhotoProduct from '../components/utils/PhotoProduct';
import { SwiperSlide, Swiper } from 'swiper/react';
import ScoreProduct from '../components/ListProductShow/ScoreProduct';

const Produto = () => {
  const url = useLocation();  
  const {json} = useFetch<productModal>(url.pathname);
  console.log(json);
  
   return (
    <div>
        <Swiper>
          <SwiperSlide>
            <PhotoProduct type='Page' color1='#FFFFFF' color2='#CECECE' shadowImage={json?.thumbnail.shadowWidth} srcImg={json.thumbnail.src}/>
          </SwiperSlide>
        </Swiper>
        <div className="description-product-container">
          <div className="description-product-name">
            <h1>{json?.name}</h1>
            <h4>Volume: {json?.volume}</h4>
          </div>
          <div className="description-product-score">
            <ScoreProduct score={json.score}/>
            <p>({json.reviews})</p>
          </div>
        </div>
    </div>
  )
}

export default Produto;