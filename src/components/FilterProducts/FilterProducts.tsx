import { useParams } from 'react-router-dom';
import './FilterProducts.css';

const listFilterProduct: ModalFilterProducts[] = [{
    title: 'Promoção',
    filters: {
        title: '/catalogo/q?filter='
    } 
}]

const FilterProducts = () => {
    const catalogoProduct = useParams<{catalogo: string}>();
    const CatalogoTitle = `${catalogoProduct.catalogo?.charAt(0).toUpperCase()}${catalogoProduct.catalogo?.substring(1)}`;

  return (
    <div className='filter-products-container'>
        <div className="filter-products-title-container">
            <h1 style={{display: 'inline-block'}} className='list-products-title'>{CatalogoTitle}</h1>
            <p className='filter-products-title-itens'>(100 itens)</p>
            
        </div>
    </div>
  )
}

export default FilterProducts;