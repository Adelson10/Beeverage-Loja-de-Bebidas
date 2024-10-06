import React from 'react';
import './Catalogo.css';
import { List } from '@phosphor-icons/react';
import { Link, useHref } from 'react-router-dom';
import { useCatalogoPage } from '../../utils/context/CatalogoPageProvider';
import { MenuProps, QuickAcess, sizeIcon } from '../../utils/ProductsMenu/ProductsMenu';
import ModalCatalogo from './ModalCatalogo';

const Catalogo = ({mobile} : {mobile: boolean}) => {
    const {CatalogoPage, setCatalogoPage} = useCatalogoPage();
    const pageNow = useHref({}).split('/').filter((path) => path!=='');
    const [containerCatalogo, setContainerCatalogo] = React.useState<boolean>(false);  
    
    function handleClick() {
        if(!CatalogoPage) document.body.style.overflowY = 'hidden';
        else document.body.style.overflowY = 'scroll'
        setCatalogoPage(!CatalogoPage);
    }
    
    return (
    <div className={'Catalogo'}>
            <ul>
                { mobile ? 
                <li><button className='catalogo_button' onClick={handleClick}><List size={sizeIcon} />Menu</button></li>
                :
                <li><button className={`catalogo_button ${containerCatalogo ? 'active' : ''}`} onFocus={() => setContainerCatalogo(!containerCatalogo)} onBlur={() => setContainerCatalogo(!containerCatalogo)}><List size={sizeIcon} />Catálogo</button></li>
                }
                {QuickAcess.map((catalogo) => {
                    const pageButton = catalogo.src.split('/').filter((path) => path!=='');
                    const filterPageNow = pageNow.filter((path, index) => index<= 1 && path == pageButton[index]);
                    const filterActive = pageButton.every((value, index) => value == filterPageNow[index]);                    
                
                    return <li key={catalogo.name}><Link to={catalogo.src} className={`catalogo_button ${ filterActive? 'active' : ''}`}>
                        {catalogo.icon}{catalogo.name}
                    </Link></li>
                })}
            </ul>
            { containerCatalogo && <ModalCatalogo MenuProps={MenuProps}/>}
        </div>
  )
}

export default Catalogo