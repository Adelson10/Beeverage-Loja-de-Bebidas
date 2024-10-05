import React from 'react';
import './Catalogo.css';
import { List, BeerStein, Martini, BeerBottle, Champagne, Brandy, ForkKnife } from '@phosphor-icons/react';
import { Link, useHref, useParams } from 'react-router-dom';
import { useCatalogoPage } from '../../utils/context/CatalogoPageProvider';

interface IQuickAcess {
    icon: React.ReactElement;
    name: string;
    src: string;
}

const sizeIcon = '1.3rem';

const QuickAcess: IQuickAcess[] = [
    {
        icon: <BeerStein size={sizeIcon}/>,
        name: 'Cervejas',
        src: '/catalogo/cervejas'
    },
    {
        icon: <Martini size={sizeIcon}/>,
        name: 'Vinhos',
        src: '/catalogo/vinhos'
    },
    {
        icon: <BeerBottle size={sizeIcon}/>,
        name: 'Destilados',
        src: '/catalogo/destilados'
    },
    {
        icon: <Champagne size={sizeIcon}/>,
        name: 'Espumantes',
        src: '/catalogo/espumantes'
    },
    {
        icon: <Brandy size={sizeIcon}/>,
        name: 'Gin',
        src: '/catalogo/gin'
    },
    {
        icon: <ForkKnife size={sizeIcon}/>,
        name: 'Petiscos',
        src: '/catalogo/petiscos'
    },
]

const Catalogo = ({mobile} : {mobile: boolean}) => {
    const {CatalogoPage, setCatalogoPage} = useCatalogoPage();
    const pageNow = useHref();
    
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
                <li><button className='catalogo_button'><List size={sizeIcon} />Catálogo</button></li>
                }
                {QuickAcess.map((catalogo) => {
                    return <li key={catalogo.name}><Link to={catalogo.src} className={`catalogo_button ${ pageNow === catalogo.src ? 'active' : ''}`}>{catalogo.icon}{catalogo.name}</Link></li>
                })}
            </ul>
        </div>
  )
}

export default Catalogo