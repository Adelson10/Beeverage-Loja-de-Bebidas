import PhotoMold from '../../assets/imagens/PhotoMold/PhotoMold';
import './PhotoProduct.css';

interface PhotoProductProps {
    color1: string;
    color2: string;
    shadowImage: string;
    srcImg: string;
}

const PhotoProduct = ({color1 ,color2 ,shadowImage, srcImg }: PhotoProductProps) => {
    
  return (
    <div className='PhotoProduct_Container'>
        <PhotoMold color1={color1} color2={color2}/>
        <div style={{width: shadowImage}} className='shadow_product'></div>
        <div style={{backgroundImage: `url(${srcImg})`}} className='PhotoProduct_Photo'></div>
    </div>
  )
}

export default PhotoProduct;