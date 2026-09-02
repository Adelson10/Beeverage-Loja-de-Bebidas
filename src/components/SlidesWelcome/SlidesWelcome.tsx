import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import React from 'react';
import { Swiper as SwiperClass } from 'swiper';
import useMedia from '../../hooks/useMedia';

interface ISlidesWelcome {
  id: number;
  src: string;
}

const SlidesWelcome = ({slides} : { slides: ISlidesWelcome[] }) => {
  const [swiperInstance, setSwiperInstance] = React.useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const mobile  = useMedia(1000);

  function handleSlideChange(swiper: SwiperClass) {
    setActiveIndex(swiper.activeIndex);
  }

  return (
        <div className='relative max-[1000px]:flex max-[1000px]:flex-col-reverse'>
          <Swiper
          className='w-full overflow-hidden rounded-[1.2rem]'
          onSwiper={setSwiperInstance}
          onSlideChange={handleSlideChange}
          grabCursor={false}
          centeredSlides={true}
          allowTouchMove={mobile ? true : false}
          slidesPerView={'auto'}
          >
            {slides.map(({id, src}) =>
              <SwiperSlide key={id}>
                <div id={`${id}`} className="h-[350px] w-full bg-cover bg-center bg-no-repeat max-[1000px]:h-[185px]" style={{backgroundImage: `url(${src})`}}></div>
              </SwiperSlide>
            )}
            {!mobile &&
            <>
              <button className='absolute left-0 top-0 z-[2] flex h-full w-[20%] items-center text-brand-dark opacity-0 transition-opacity duration-300 ease-[ease] hover:rounded-l-[1.2rem] hover:bg-linear-to-l hover:from-transparent hover:to-brand-dark hover:opacity-70' onClick={() => swiperInstance?.slidePrev()}></button>
              <button className='absolute right-0 top-0 z-[2] flex h-full w-[20%] items-center text-brand-dark opacity-0 transition-opacity duration-300 ease-[ease] hover:rounded-r-[1.2rem] hover:bg-linear-to-r hover:from-transparent hover:to-brand-dark hover:opacity-70' onClick={() => swiperInstance?.slideNext()}></button>
            </>}

          </Swiper>
          <div>
              <div className="swiper-pagination-perso">
                {slides.map(({id},index) =>
                  <div key={id} className={ `swiper-pagination-bullet ${activeIndex===index ? 'swiper-pagination-bullet-active' : ''}`}></div>
                )}
              </div>
          </div>
        </div>
  )
}

export default SlidesWelcome;