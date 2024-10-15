import { CaretDown } from "@phosphor-icons/react";
import './ModalFilterProducts.css'
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChangeEvent } from "react";

interface ModalFilterProducts {
    title: string;
    filters: FiltersProducts[];
}

const ModalFilterProducts = ({title, filters}: ModalFilterProducts) => {
    const key = 'filter';

    const [filter, setFilter] = useSearchParams();

    function handleChange(event: ChangeEvent) {
        const value = event.currentTarget.id;

        setFilter((filter) => {
            let values = filter.get(key)?.split(",");
            
            if(values) {

                if(values.includes(value)) {
                    values = values.filter((valueNow) => valueNow !== value);
                } else {
                    values.push(value)
                }
                console.log(values);
                
                if (values.length) {                    
                    filter.set(key, values);
                } else {
                    filter.delete(key);
                }
                
            } else {
                filter.set(key, [value]);
            }            

            return filter;
        });
    }

    function isChecked(id: string): boolean {
        const verific = filter.get(key)?.split(',');
         
        if(verific) {
            const listFilter = verific.includes(id);
            return listFilter;
        }
        else return false;
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
            <label key={filter.title} className="modal-filter-products-filter" htmlFor={filter.title}>
                <input type="checkbox" onChange={handleChange} value={filter.title} name={filter.title} id={filter.title} checked={isChecked(filter.title)}/>
                {filter.title}
            </label>
        )}
    </div>
  )
}

export default ModalFilterProducts;