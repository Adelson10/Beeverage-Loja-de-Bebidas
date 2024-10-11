import './SlidesWelcome.css';
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import React from 'react';
import { Navigation, Pagination } from 'swiper/modules';

interface ISlidesWelcome {
  id: number;
  src: string;
}

const SlidesWelcome = ({slides} : { slides: ISlidesWelcome[] }) => {  
  return (
    <div className='SlidesWelcome'>
      <div className='SlidesWelcomeBox'>
        <Swiper
        modules={[Pagination, Navigation]}
        pagination={{el:'.swiper-pagination', clickable: true}}
        navigation={{
          nextEl: '.SlidesWelcome_ButtonNext',
          prevEl: '.SlidesWelcome_ButtonPrev',
        }}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        >
          {slides.map(({id, src}) =>
            <SwiperSlide key={id}>
              <div id={`${id}`} className="SlidesWelcome_Slide" style={{backgroundImage: `url(${src})`}}></div>
            </SwiperSlide>
          )}
          <button className='SlidesWelcome_ButtonPrev'></button>
          <button className='SlidesWelcome_ButtonNext'></button>
          <div className="swiper-pagination"></div>
        </Swiper>
      </div>
    </div>
  )
}

export default SlidesWelcome;