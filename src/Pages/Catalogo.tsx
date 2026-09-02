/* eslint-disable react/react-in-jsx-scope */
//import { useLocation } from "react-router-dom";
import FilterProducts from "../components/FilterProducts/FilterProducts";
import ProductModal from "../components/ProductModal/ProductModal";
// import useFetch from "../hooks/useFetch";
import './Catalogo.css';
import { ProdutoMockup } from "../utils/Mockup/ProductPromo";

const Catalogo = () => {
  // const url = useLocation();
  // const {json} = useFetch<productModal[]>( !url.search ? url.pathname : `${url.pathname}${url.search}`);

  return (
    <div className="grid gap-x-4 grid-cols-[20%_78%] max-[1000px]:flex max-[1000px]:flex-col">
      <FilterProducts />
      <div className="grid grid-cols-[repeat(4,193px)] auto-rows-[325px] max-[1000px]:grid-cols-[repeat(3,auto)] max-[600px]:grid-cols-[repeat(2,auto)] max-[400px]:grid-cols-[repeat(2,170px)]">
        { ProdutoMockup.map((product, index) =>
            <ProductModal key={index} product={product}/>
        ) }
      </div>
    </div>
  )
}

export default Catalogo;