import React from 'react';
import PhotoProduct from '../utils/PhotoProduct';
import ScoreProduct from './ScoreProduct';

interface ListProductShowProps {
    title: string;
    productModal: productModal[];
}

const ListProductShow = ({title, productModal}: ListProductShowProps) => {
  return (
    <div className='ListProductShow'>
        <h1 className='ListProductShow_Title'>{title}</h1>
        {productModal.map((product) => 
            <div key={product.code} className='ProductModal'>
                <div className="ProductModalBoxImage">
                    <PhotoProduct
                    color1='#FFFFFF'
                    color2='#CECECE'
                    shadowImage={`${product.image.shadowWidth}px`}
                    srcImg={product.image.src}/>
                    {product.price && <div className='ProductModal_Image_Discount'>-{(product.priceNow*100)/product.price}%</div>}
                </div>
                <ScoreProduct score={product.score}/>
            </div>
        )}
    </div>
  )
}

export default ListProductShow;