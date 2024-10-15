import { CaretDown } from "@phosphor-icons/react";
import './ModalFilterProducts.css'
import { useNavigate } from "react-router-dom";

interface ModalFilterProducts {
    title: string;
    filters: FiltersProducts[];
}

const ModalFilterProducts = ({title, filters}: ModalFilterProducts) => {

    const navigation = useNavigate();

    function handleChange() {

    }

  return (
    <div className='modal-filter-products-container'>
        <div className="modal-filter-products-title-container">
            <h1 className="modal-filter-products-title">{title}</h1>
            <button className="modal-filter-products-title-close">
                <CaretDown weight="fill" size='1.2rem'/>
            </button>
        </div>
        {filters.map((filter) => 
            <label key={filter.title} className="modal-filter-products-filter" htmlFor={filter.src}>
                <input type="checkbox" onChange={handleChange} name={filter.src} id={filter.src} />
                {filter.title}
            </label>
        )}
    </div>
  )
}

export default ModalFilterProducts;