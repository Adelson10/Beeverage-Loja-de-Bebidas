import React, { TouchEventHandler, useRef } from 'react';
import PhotoProduct from '../utils/PhotoProduct';
import ScoreProduct from './ScoreProduct';
import './ListProductShow.css';
import { Link } from 'react-router-dom';

interface ListProductShowProps {
    title: string;
    productModal: productModal[];
}

const ListProductShow = ({title, productModal}: ListProductShowProps) => {

    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isMoving, setIsMoving] = React.useState(false);
    const startX = useRef(0);
    const href = useRef<HTMLDivElement>(null);

    const handleTouchStart: TouchEventHandler = (e) => {
        startX.current = e.touches[0].clientX;
    }    

    const handleTouchMove: TouchEventHandler = (e) => {
        if (isMoving) return;
    
        const touchX = e.touches[0].clientX;
        const diffX = touchX - startX.current;
        
        if (Math.abs(diffX) > 0) {
          setIsMoving(true);
          if (diffX > 0 && currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
            console.log(currentIndex);
            
          } else if (diffX < 0 && currentIndex < productModal.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
              console.log(currentIndex);
              
          }
        }
      };

      const handleTouchEnd: TouchEventHandler = (e) => {
        if (isMoving) {
          const touchX = e.changedTouches[0].clientX;
          const diffX = touchX - startX.current;
    
          if (Math.abs(diffX) < 200) {
            setCurrentIndex((prevIndex) => prevIndex);
          }
        }
        setIsMoving(false);
      };

  return (
    <div className='ListProductShow'>
        <h1 className='ListProductShow_Title'>{title}</h1>
        <div className='ProductModalList' ref={href} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            {productModal.map((product) => 
                <Link id={product.code} to={product.categoriaSrc} key={product.code} className='ProductModal'>
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
            )}
            <button className='ListModalList_Button Right'></button>
        </div>
    </div>
  )
}

export default ListProductShow;