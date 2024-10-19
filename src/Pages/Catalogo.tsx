/* eslint-disable react/react-in-jsx-scope */
import FilterProducts from "../components/FilterProducts/FilterProducts";
import { ProdutoCervejaMockup } from "../utils/Mockup/ProductsCerveja";
import './Catalogo.css';

const Catalogo = () => {
  return (
    <div className="page-catalogo-container">
      <FilterProducts />
      <div className="products-grid-container">
        {ProdutoCervejaMockup.map(({code, name, categoriaSrc, image, price, priceNow, score, volume}) => 
          
        )}
      </div>
    </div>
  )
}

export default Catalogo;