import './SlidesWelcome.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import React from 'react';

interface ISlidesWelcome {
  id: number;
  src: string;
}



const SlidesWelcome = ({slides} : { slides: ISlidesWelcome[] }) => {  
  const ref = React.useRef(null);

  React.useEffect(() => {
    const element = document.querySelector('.swiper-wrapper');
    
    if(element) {
      const parent = element.parentNode;
      const wrapper = document.createElement('div');

      if(parent) {
        parent.replaceChild(wrapper, element);
        wrapper.appendChild(element);
      }
    }
  },[]);

  return (
        <Swiper
        ref={ref}
        style={{borderRadius: '1.2rem', width:'100%'}}
        modules={[Pagination, Navigation]}
        pagination={{el:'.swiper-pagination', clickable: true}}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        >
          {slides.map(({id, src}) =>
            <SwiperSlide key={id}>
              <div id={`${id}`} className="swiper-slide-img" style={{backgroundImage: `url(${src})`}}></div>
            </SwiperSlide>
          )}
          <button className='swiper-button-prev-custom'></button>
          <button className='swiper-button-next-custom'></button>
          <div className="swiper-pagination"></div>
        </Swiper>
  )
}

export default SlidesWelcome;