/* eslint-disable react/react-in-jsx-scope */
//import { useLocation } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import FilterProducts, { filterProductsByCategory, defaultFilterProducts } from "../components/FilterProducts/FilterProducts";
import ProductModal from "../components/ProductModal/ProductModal";
// import useFetch from "../hooks/useFetch";
import './Catalogo.css';
import { ProdutoMockup } from "../utils/Mockup/ProductPromo";

const Catalogo = () => {
  // const url = useLocation();
  // const {json} = useFetch<productModal[]>( !url.search ? url.pathname : `${url.pathname}${url.search}`);
  const { catalogo } = useParams<{ catalogo: string }>();
  const [searchParams] = useSearchParams();

  const selectedFilters = searchParams.get('filter')?.split(',').filter(Boolean) ?? [];
  const priceRange = searchParams.get('price')?.split(',').map(Number);
  const filterGroups = (catalogo && filterProductsByCategory[catalogo]) || defaultFilterProducts;

  const products = ProdutoMockup.filter((product) => {
    if (catalogo && product.categoria !== catalogo) {
      return false;
    }

    if (priceRange?.length === 2 && (product.priceNow < priceRange[0] || product.priceNow > priceRange[1])) {
      return false;
    }

    return filterGroups.every(({ filters }) => {
      const selectedInGroup = filters.filter((filter) => selectedFilters.includes(filter));

      if (!selectedInGroup.length) return true;

      return selectedInGroup.some((filter) =>
        filter === 'Promoção' ? product.price > 0 : product.filter.includes(filter)
      );
    });
  });

  return (
    <div className="grid gap-x-4 grid-cols-[20%_78%] max-[1000px]:flex max-[1000px]:flex-col">
      <FilterProducts total={products.length} />
      <div className="grid grid-cols-[repeat(4,193px)] auto-rows-[325px] max-[1000px]:grid-cols-[repeat(3,auto)] max-[600px]:grid-cols-[repeat(2,auto)] max-[400px]:grid-cols-[repeat(2,170px)]">
        { products.map((product, index) =>
            <ProductModal key={index} product={product}/>
        ) }
      </div>
    </div>
  )
}

export default Catalogo;