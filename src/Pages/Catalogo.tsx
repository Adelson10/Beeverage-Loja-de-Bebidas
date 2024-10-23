/* eslint-disable react/react-in-jsx-scope */
import FilterProducts from "../components/FilterProducts/FilterProducts";
import ProductModal from "../components/ProductModal/ProductModal";
import { ProdutoCervejaMockup } from "../utils/Mockup/ProductsCerveja";
import './Catalogo.css';

const Catalogo = () => {
  return (
    <div className="page-catalogo-container">
      <FilterProducts />
      <div className="products-grid-container">
        {ProdutoCervejaMockup.map((product, index) => 
            <ProductModal key={index} product={product}/>
        )}
      </div>
    </div>
  )
}

export default Catalogo;