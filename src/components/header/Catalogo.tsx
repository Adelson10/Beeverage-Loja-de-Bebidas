import React from 'react';
import './Catalogo.css';
import { List, BeerStein, Martini, BeerBottle, Champagne, Brandy, ForkKnife } from '@phosphor-icons/react';
import { NavLink } from 'react-router-dom';

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

const Catalogo = () => {
  return (
    <div className={'Catalogo'}>
            <ul>
                <li><button className='catalogo_button'><List size={sizeIcon} onClick={() => console.log('catalogo')} />Catálogo</button></li>
                {QuickAcess.map((catalogo) => {
                    return <li key={catalogo.name}><NavLink to={catalogo.src} className={({isActive}) => isActive ? 'catalogo_button active' : 'catalogo_button'}>{catalogo.icon}{catalogo.name}</NavLink></li>
                })}
            </ul>
        </div>
  )
}

export default Catalogo