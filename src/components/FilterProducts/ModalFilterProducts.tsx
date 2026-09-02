import { CaretDown } from "@phosphor-icons/react";
import { useSearchParams } from "react-router-dom";
import React, { ChangeEvent } from "react";

const ModalFilterProducts = ({title, filters}: ModalFilterProducts) => {
    const key = 'filter';
    const [animation, setAnimation] = React.useState<boolean>(false);
    
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
                
                if (values.length) {                    
                    filter.set(key, values.toString());
                } else {
                    filter.delete(key);
                }
                
            } else {
                filter.set(key, [value].toString());
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
    <div className='py-[.6rem] px-2 rounded-[.8rem] bg-bg-secundary'>
        <div className="flex items-center justify-between mb-1">
            <h1 className="text-base font-medium text-brand-dark">{title}</h1>
            <button className="text-brand-dark"
            onClick={() => setAnimation((n) => !n)}>
                <CaretDown weight="fill" size='1.2rem' className={animation ? 'transition-transform duration-700 ease rotate-180' : ''}/>
            </button>
        </div>
            <div className={`block relative overflow-y-hidden transition-[max-height] duration-500 ease ${ animation ? 'max-h-0' : 'max-h-[200px]'}`}>
                {filters.map((name) =>
                    <label key={name} className="text-base font-light text-primary grid grid-cols-[1em_auto] gap-2 items-center cursor-pointer" htmlFor={name}>
                        <input type="checkbox" onChange={handleChange} id={name} checked={isChecked(name)}
                        className="appearance-none [background:none] w-[1.3em] h-[1.3em] [outline:0] border border-primary rounded-[0.2em] -translate-y-[0.075em] flex items-center justify-center cursor-pointer before:content-[''] before:block before:w-[0.8em] before:h-[0.8em] before:rounded-[0.1rem] before:scale-0 before:transition-transform before:duration-[120ms] before:ease-in-out before:shadow-[inset_1em_1em_var(--color-brand-dark)] checked:before:scale-100"/>
                        {name}
                    </label>
                )}
        </div>
    </div>
  )
}

export default ModalFilterProducts;