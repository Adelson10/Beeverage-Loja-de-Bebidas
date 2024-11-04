/* eslint-disable react/react-in-jsx-scope */
import { useLocation } from "react-router-dom";
import FilterProducts from "../components/FilterProducts/FilterProducts";
import ProductModal from "../components/ProductModal/ProductModal";
import useFetch from "../hooks/useFetch";
import { ProdutoCervejaMockup } from "../utils/Mockup/ProductsCerveja";
import './Catalogo.css';

const Catalogo = () => {
  const url = useLocation();  
  const {json} = useFetch<productModal[]>( !url.search ? url.pathname : `${url.pathname}${url.search}`);
  console.log(json);
  
  return (
    <div className="page-catalogo-container">
      <FilterProducts />
      <div className="products-grid-container">
        {json && json.map((product, index) => 
            <ProductModal key={index} product={product}/>
        )}
      </div>
    </div>
  )
}

export default Catalogo;