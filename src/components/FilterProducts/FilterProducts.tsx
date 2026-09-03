/* eslint-disable react/react-in-jsx-scope */
import { useParams } from 'react-router-dom';
import ModalFilterProducts from './ModalFilterProducts';
import ModalPriceProducts from './ModalPriceProducts';
import { useFilterActive } from '../../utils/context/FilterActiveProvider';
import useMedia from '../../hooks/useMedia';
import './FilterProducts.css';

export const listFilterProduct: ModalFilterProducts[] = [
    {
        title: 'Em Promoção',
        filters: ['Promoção']
    },
    {
        title: 'Tipo de Cerveja',
        filters: ['Lager', 'IPA', 'Pilsen', 'Weiss', 'Stout'],
    },
    {
        title: 'Marca',
        filters: ['Heineken', 'Brahma', 'Skol', 'Corona', 'Stella','Artois','Amstel'],
    },
    {
        title: 'Volume',
        filters: ['330ml', '355ml', '600ml', '1L'],
    },
    {
        title: 'Opções de Compra',
        filters: ['Unidade', 'Pack'],
    },
]

const FilterProducts = ({total}: {total?: number}) => {
    const catalogoProduct = useParams<{catalogo: string}>();
    const CatalogoTitle = `${catalogoProduct.catalogo?.charAt(0).toUpperCase()}${catalogoProduct.catalogo?.substring(1)}`;
    const {filterActive} = useFilterActive();
    const mobile = useMedia(1000);

  if(filterActive || !mobile) return (
    <div className={`filter-products-container ${mobile ? 'animate-[FilterPanelIn_350ms_ease-out_forwards]' : ''}`}>
        <div className="filter-products-title-container flex flex-col justify-between gap-4">
            <div className="filter-products-container-title-container">
                <h1 className='inline-block text-[1.4rem] font-semibold bg-linear-to-l from-brand-dark to-brand bg-clip-text text-transparent selection:text-white'>{CatalogoTitle}</h1>
                <p className='inline-block text-[.6rem] ml-[.1rem] text-primary'>({total ?? 0} itens)</p>
            </div>
            {listFilterProduct.map(({title, filters}) => 
                (<ModalFilterProducts key={title} title={title} filters={filters}/>)
            )}
            <ModalPriceProducts />
        </div>
    </div>
  )
}

export default FilterProducts;