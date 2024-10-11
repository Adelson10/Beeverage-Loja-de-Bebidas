import './SlidesWelcome.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';

interface ISlidesWelcome {
  id: number;
  src: string;
}

const SlidesWelcome = ({slides} : { slides: ISlidesWelcome[] }) => {  
  return (
        <>
        <Swiper
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
        </>
  )
}

export default SlidesWelcome;