import { Link } from 'react-router-dom';
import PhotoProduct from '../utils/PhotoProduct';
import ScoreProduct from '../ListProductShow/ScoreProduct';
import discountIcon from '../../assets/imagens/Product/discount.svg';

const ProductModal = ({product}: {product: productModal}) => {
  return (
    <Link id={`${product.id}`} to={`/produto/${product.categoria}/${product.id}/${product.name.replaceAll('-', '').replaceAll('  ','').replaceAll(' ','-')}`} className='flex flex-col gap-1 py-2 px-4 box-content'>
        <div className="relative flex flex-col">
        <PhotoProduct
        color1='#FFFFFF'
        color2='#CECECE'
        shadowImage={product.thumbnail.shadowWidth}
        srcImg={product.thumbnail.src}/>
        {product.price!==0 && <div style={{backgroundImage: `url(${discountIcon})`}} className='absolute bottom-0 h-[35px] w-[35px] bg-center flex items-center justify-center text-white text-[0.6rem]'>{(((product.priceNow*100)/product.price)-100).toFixed(0)}%</div>}
        </div>
            <ScoreProduct score={product.score}/>
                <h3 className="text-[0.8rem] font-medium text-secundary! overflow-hidden text-ellipsis line-clamp-2">{product.name}</h3>
                <h4 className="text-primary text-[0.6rem] font-normal"><strong className="font-medium">Volume:</strong> {product.volume}</h4>
                <div className='flex flex-wrap items-center gap-[0.2rem]'>
                { product.price>0 && <h2 className="font-medium text-[0.9rem] text-primary"><del>{product.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</del></h2>}
                <h2 className="text-[1.2rem] text-brand-dark font-bold">{product.priceNow.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h2>
                </div>
        </Link>
  )
}

export default ProductModal;
