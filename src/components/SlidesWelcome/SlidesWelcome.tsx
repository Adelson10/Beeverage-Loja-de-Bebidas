import React, { useRef } from 'react';
import './SlidesWelcome.css';

interface ISlidesWelcome {
  id: number;
  src: string;
}

const SlidesWelcome = ({slides} : { slides: ISlidesWelcome[] }) => {
  const [slideNow, SetSlideNow] = React.useState<number>(0);
  const refSlide = useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {    
    refSlide.current!.style.transform = `translateX(${(-(refSlide.current!.offsetWidth)) * slideNow}px)`;
  },[slideNow]);

  return (
    <div className='SlidesWelcome'>
      <div className='SlidesWelcomeBox'>
        <div ref={refSlide} className="SlidesWelcome_Container">
          {slides.map(({id, src}) =>
            <div key={id} id={`${id}`} className="SlidesWelcome_Slide" style={{backgroundImage: `url(${src})`}}></div>
          )}
        </div>
        <button onClick={() => { 
          if(slideNow > 0) return SetSlideNow((a) => a - 1);
        }} className='SlidesWelcome_Button Left'></button>
        <button onClick={() => {
          if(slideNow < slides.length-1 ) return SetSlideNow((a) => a + 1);
        }}
        className='SlidesWelcome_Button Right'></button>
      </div>
      <div className="SlideNow_Container">
        {slides.map(({id}) => 
          <div key={id} className={`SlideNow ${slideNow==id ? 'active' : ''}`}></div>
        )}
    </div>
    </div>
  )
}

export default SlidesWelcome;