import React from 'react';
import PhotoProduct from '../utils/PhotoProduct';
import ScoreProduct from './ScoreProduct';
import './ListProductShow.css';
import { Link, useHref } from 'react-router-dom';

interface ListProductShowProps {
    title: string;
    productModal: productModal[];
}

const ListProductShow = ({title, productModal}: ListProductShowProps) => {

    const refRight = useHref<HTMLButtonElement>(null);
    console.log();

  return (
    <div className='ListProductShow'>
        <h1 className='ListProductShow_Title'>{title}</h1>
        <div className='ProductModalList'>
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
            <button ref={refRight} className='ListModalList_Button Right'></button>
        </div>
    </div>
  )
}

export default ListProductShow;