import './SlidesWelcome.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import React from 'react';
import { Swiper as SwiperClass } from 'swiper';
import useMedia from '../../hooks/useMedia';

interface ISlidesWelcome {
  id: number;
  src: string;
}

const SlidesWelcome = ({slides} : { slides: ISlidesWelcome[] }) => {
  const [swiperInstance, setSwiperInstance] = React.useState<SwiperClass | null>(null);
  const mobile  = useMedia(1000);

  return (
        <div className='swiper-welcome'>
          <Swiper
          onSwiper={setSwiperInstance}
          modules={[Pagination]}
          pagination={{el:'.swiper-pagination', clickable: true}}
          grabCursor={false}
          centeredSlides={true}
          allowTouchMove={mobile ? true : false}
          loop={true}
          slidesPerView={'auto'}
          >
            {slides.map(({id, src}) =>
              <SwiperSlide key={id}>
                <div id={`${id}`} className="swiper-slide-img" style={{backgroundImage: `url(${src})`}}></div>
              </SwiperSlide>
            )}
          </Swiper>
          <div className="switer-controller">
              <button className='swiper-button-prev-custom swiper-welcome-buttom' onClick={() => swiperInstance?.slidePrev()}></button>
              <button className='swiper-button-next-custom swiper-welcome-buttom' onClick={() => swiperInstance?.slideNext()}></button>
              <div className="swiper-pagination"></div>
          </div>
        </div>
  )
}

export default SlidesWelcome;