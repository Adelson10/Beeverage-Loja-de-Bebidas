import { useParams } from 'react-router-dom';
import './FilterProducts.css';
import ModalFilterProducts from './ModalFilterProducts';

const listFilterProduct: ModalFilterProducts[] = [
    {
        title: 'Em Promoção',
        filters: [{
            title: 'Promoção',
            src: '/q?filter=promoção',
        }]
    },
    {
        title: 'Tipo de Cerveja',
        filters: [{
            title: 'Lager',
            src: '/q?filter=Lager',
        } , {
            title: 'IPA',
            src: '/q?filter=IPA',
        } , {
            title: 'Pilsen',
            src: '/q?filter=Pilsen',
        } , {
            title: 'Weiss',
            src: '/q?filter=Weiss',
        } , {
            title: 'Stout',
            src: 'filter=Stout',
        },
        ]
    },
]

const FilterProducts = () => {
    const catalogoProduct = useParams<{catalogo: string}>();
    const CatalogoTitle = `${catalogoProduct.catalogo?.charAt(0).toUpperCase()}${catalogoProduct.catalogo?.substring(1)}`;

  return (
    <div className='filter-products-container'>
        <div className="filter-products-title-container">
            <div className="filter-products-container-title-container">
                <h1 style={{display: 'inline-block'}} className='list-products-title'>{CatalogoTitle}</h1>
                <p className='filter-products-title-itens'>(100 itens)</p>
            </div>
            {listFilterProduct.map(({title, filters}) => 
                (<ModalFilterProducts key={title} title={title} filters={filters}/>)
            )}
        </div>
    </div>
  )
}

export default FilterProducts;