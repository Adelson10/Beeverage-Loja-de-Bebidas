import { Link } from 'react-router-dom';
import PhotoProduct from '../utils/PhotoProduct';
import './MenuContainer.css';
import { useCatalogoPage } from '../../utils/context/CatalogoPageProvider';

const CatalogoContainer = ({title, src, img, shadowImage, categorias, id}: MenuContainerProps & {id: number}) => {
    const {setCatalogoPage} = useCatalogoPage();

    return (
    <div className='CatalogoProducts'>
        <Link onClick={() => setCatalogoPage(false)} to={src} className='CatalogoContainer_title'><h1>{title}</h1></Link>
        <div className={`CatalogoDescription ${(id+1) % 2 == 1 ? 'right' : 'left'}`}>
            <PhotoProduct color1='#009C33' color2='#006B23' srcImg={img} shadowImage={shadowImage}/>
            <div className='Catalogo_Product'>
                {categorias.map((categoria) => 
                    <Link onClick={() => setCatalogoPage(false)} key={categoria.name} to={categoria.src} className='Catalogo_Product_product'>
                        <h4 className='Catalogo_Product_name'>{categoria.name}</h4>
                        <div className='Catalogo_Product_Container_line'>
                            <div className='Catalogo_Product_line'></div>
                        </div> 
                        <h4>$$</h4>
                    </Link>
                )}
            </div>
        </div>
    </div>
  )
}

export default CatalogoContainer;