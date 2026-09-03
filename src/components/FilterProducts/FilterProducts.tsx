/* eslint-disable react/react-in-jsx-scope */
import { useParams } from 'react-router-dom';
import ModalFilterProducts from './ModalFilterProducts';
import ModalPriceProducts from './ModalPriceProducts';
import { useFilterActive } from '../../utils/context/FilterActiveProvider';
import useMedia from '../../hooks/useMedia';
import { MenuProps } from '../../utils/ProductsMenu/ProductsMenu';
import './FilterProducts.css';

const promocaoFilter: ModalFilterProducts = {
    title: 'Em Promoção',
    filters: ['Promoção'],
};

const opcoesDeCompraFilter: ModalFilterProducts = {
    title: 'Opções de Compra',
    filters: ['Unidade', 'Pack'],
};

// Filtro "Tipo de X" de cada bebida derivado das subcategorias já cadastradas no catálogo (ProductsMenu),
// para que cada tipo de bebida existente no menu ganhe seu próprio filtro automaticamente.
export const filterProductsByCategory: Record<string, ModalFilterProducts[]> = MenuProps.reduce((acc, menu) => {
    const slug = menu.src.split('/').filter(Boolean)[1];

    acc[slug] = [
        promocaoFilter,
        { title: `Tipo de ${menu.title.replace(/s$/, '')}`, filters: menu.categorias.map(({ name }) => name) },
        opcoesDeCompraFilter,
    ];

    return acc;
}, {} as Record<string, ModalFilterProducts[]>);

export const defaultFilterProducts = filterProductsByCategory.cervejas;

const FilterProducts = ({total}: {total?: number}) => {
    const catalogoProduct = useParams<{catalogo: string}>();
    const catalogo = catalogoProduct.catalogo ?? '';
    const CatalogoTitle = `${catalogo.charAt(0).toUpperCase()}${catalogo.substring(1)}`;
    const {filterActive} = useFilterActive();
    const mobile = useMedia(1000);
    const filterGroups = filterProductsByCategory[catalogo];

  if(filterActive || !mobile) return (
    <div className={`filter-products-container ${mobile ? 'animate-[FilterPanelIn_350ms_ease-out_forwards]' : ''}`}>
        <div className="filter-products-title-container flex flex-col justify-between gap-4">
            <div className="filter-products-container-title-container">
                <h1 className='inline-block text-[1.4rem] font-semibold bg-linear-to-l from-brand-dark to-brand bg-clip-text text-transparent selection:text-white'>{CatalogoTitle}</h1>
                <p className='inline-block text-[.6rem] ml-[.1rem] text-primary'>({total ?? 0} itens)</p>
            </div>
            {filterGroups.map(({title, filters}) =>
                (<ModalFilterProducts key={title} title={title} filters={filters}/>)
            )}
            <ModalPriceProducts />
        </div>
    </div>
  )
}

export default FilterProducts;