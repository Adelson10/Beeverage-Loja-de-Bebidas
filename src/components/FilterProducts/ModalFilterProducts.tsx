import { CaretDown } from "@phosphor-icons/react";
import './ModalFilterProducts.css'

interface ModalFilterProducts {
    title: string;
    filters: FiltersProducts[];
}

const ModalFilterProducts = ({title, filters}: ModalFilterProducts) => {
  return (
    <div className='modal-filter-products-container'>
        <div className="modal-filter-products-title-container">
            <h1 className="modal-filter-products-title">{title}</h1>
            <button>
                <CaretDown weight="fill" size='1.2rem'/>
            </button>
        </div>
        {filters.map((filter) => 
            <label className="modal-filter-products-filter" htmlFor={filter.src}>{filter.title}
                <input type="checkbox" name={filter.src} id={filter.src} />
            </label>
        )}
    </div>
  )
}

export default ModalFilterProducts;