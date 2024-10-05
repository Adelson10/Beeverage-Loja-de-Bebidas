import { Link } from 'react-router-dom';
import './MenuContainer.css';
import { useCatalogoPage } from '../../utils/context/CatalogoPageProvider';

const CatalogoContainer = ({title, src, img, categorias, id}: MenuContainerProps & {id: number}) => {
    const {setCatalogoPage} = useCatalogoPage();

    return (
    <div className='CatalogoProducts'>
        <div className={`CatalogoDescription ${(id+1) % 2 == 1 ? 'right' : 'left'}`}>
            <div className="CatalogoImage" style={{backgroundImage: `url(${img})`}}></div>
            <div className='ListProduct_toTitle'>
                <div className="ListProduct_bg_title">
                <Link onClick={() => setCatalogoPage(false)} to={src} className='CatalogoContainer_title MenuTitle'>{title}</Link>
                </div>
                <div className='Catalogo_Product'>
                    {categorias.map((categoria) => 
                        <Link onClick={() => setCatalogoPage(false)} key={categoria.name} to={categoria.src} className='Catalogo_Product_product'>
                            <h4 className='Catalogo_Product_name'>{categoria.name}</h4>
                            <div className='Catalogo_Product_Container_line'>
                                <div className='Catalogo_Product_line'></div>
                            </div> 
                            <h4 className='Catalogo_Product_name'>$$</h4>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default CatalogoContainer;