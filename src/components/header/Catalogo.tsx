import React from 'react';
import './Catalogo.css';
import { List } from '@phosphor-icons/react';
import { Link, useHref } from 'react-router-dom';
import { useCatalogoPage } from '../../utils/context/CatalogoPageProvider';
import { MenuProps, QuickAcess, sizeIcon } from '../../utils/ProductsMenu/ProductsMenu';

const catalogoButtonBase = "flex w-[calc((100vw*0.90)/3_-_1rem)] max-w-[130px] items-center justify-center gap-2 rounded-lg px-2 py-3 text-[0.8rem] font-light [&_svg]:min-w-[1.2rem] min-[1000px]:max-w-[135px] min-[1000px]:gap-[0.3rem] min-[1000px]:p-2 min-[1000px]:text-[0.9rem]";
const catalogoButtonInactive = "bg-white text-brand-dark";
const catalogoButtonActive = "bg-linear-[-68deg] from-brand-dark to-brand text-white";

const Catalogo = ({mobile} : {mobile: boolean}) => {
    const {CatalogoPage, setCatalogoPage} = useCatalogoPage();
    const pageNow = useHref({}).split('/').filter((path) => path!=='');

    const [showCategories, setShowCategories] = React.useState(false);
    
    function handleClick() {
        if(!CatalogoPage) document.body.style.overflowY = 'hidden';
        else document.body.style.overflowY = 'scroll'
        setCatalogoPage(!CatalogoPage);
    }

    return (
    <div>
        <ul className="flex list-none gap-2 overflow-x-scroll [&::-webkit-scrollbar]:hidden min-[1000px]:justify-between min-[1000px]:gap-0 min-[1000px]:overflow-x-hidden">
                { mobile ?
                <li>
                    <button className={`${catalogoButtonBase} ${catalogoButtonInactive}`} onClick={handleClick}><List size={sizeIcon} />Menu</button>
                </li>
                :
                <li>
                    <button onClick={() => setShowCategories(!showCategories)} className={`${catalogoButtonBase} ${showCategories ? catalogoButtonActive : catalogoButtonInactive}`}>
                    <div className={`relative w-[18px] h-[2px] transition-transform duration-300 before:absolute before:block before:h-[2px] before:w-[18px] before:transition-transform before:duration-300 before:content-[''] after:absolute after:block after:h-[2px] after:w-[18px] after:transition-transform after:duration-300 after:content-[''] ${
                        showCategories
                            ? "-translate-x-[4px] translate-y-[1px] bg-transparent before:bg-white before:[transform:rotateZ(-45deg)_translate(5px,5px)_scaleX(0.71)] after:bg-white after:[transform:rotateZ(45deg)_translate(-1px,1px)_scaleX(0.7)]"
                            : "bg-brand-dark before:-translate-y-[6px] before:bg-brand-dark after:translate-y-[6px] after:bg-brand-dark"
                    }`}></div>Catálogo</button>
                </li>
                }
                {QuickAcess.map((catalogo) => {
                    const pageButton = catalogo.src.split('/').filter((path) => path!=='');
                    const filterPageNow = pageNow.filter((path, index) => index<= 1 && path == pageButton[index]);
                    const filterActive = pageButton.every((value, index) => value == filterPageNow[index]);

                    return <li key={catalogo.name}><Link to={catalogo.src} className={`no-underline ${catalogoButtonBase} ${filterActive ? catalogoButtonActive : catalogoButtonInactive}`}>
                        {catalogo.icon}{catalogo.name}
                    </Link></li>
                })}
            </ul>
            { showCategories &&
            <ul className="absolute z-[15] flex animate-[ModalCatalogo_300ms_forwards] flex-col gap-[0.2rem] rounded-lg bg-white p-4 shadow-[0px_0px_8px_rgba(0,0,0,0.15)]">
                {MenuProps.map((catalogo) =>
                        <li key={catalogo.title}>
                            <Link to={catalogo.src} onClick={() => setShowCategories(false)} className="flex items-center gap-2 no-underline text-brand-dark hover:text-brand hover:underline active:text-brand active:underline">
                                <h3 className="mb-[0.3rem] font-semibold text-brand-dark">{catalogo.title}</h3>
                            </Link>
                            <ul className="grid grid-cols-2 gap-y-2">
                                {catalogo.categorias.map((catalogo) =>
                                    <li key={catalogo.name}><Link onClick={() => setShowCategories(false)} to={catalogo.src} className="text-primary no-underline hover:text-brand hover:underline active:text-brand active:underline">{catalogo.name}</Link></li>
                                )}
                            </ul>
                        </li>
                )}
            </ul>
            }
        </div>
  )
}

export default Catalogo