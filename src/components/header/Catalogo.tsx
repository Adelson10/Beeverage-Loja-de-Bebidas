import React from 'react';
import './Catalogo.css';
import { List, BeerStein, Martini, BeerBottle, Champagne, Brandy, ForkKnife } from '@phosphor-icons/react';

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
        src: 'cervejas'
    },
    {
        icon: <Martini size={sizeIcon}/>,
        name: 'Vinhos',
        src: 'vinhos'
    },
    {
        icon: <BeerBottle size={sizeIcon}/>,
        name: 'Destilados',
        src: 'destilados'
    },
    {
        icon: <Champagne size={sizeIcon}/>,
        name: 'Espumantes',
        src: 'espumantes'
    },
    {
        icon: <Brandy size={sizeIcon}/>,
        name: 'Gin',
        src: 'gin'
    },
    {
        icon: <ForkKnife size={sizeIcon}/>,
        name: 'Petiscos',
        src: 'petiscos'
    },
]

const Catalogo = () => {
  return (
    <div className={'Catalogo'}>
            <ul>
                <li><button className='catalogo_button select'><List size={sizeIcon} onClick={() => console.log('catalogo')} />Catálogo</button></li>
                {QuickAcess.map((catalogo) => {
                    return <li key={catalogo.name}><button className='catalogo_button'>{catalogo.icon}{catalogo.name}</button></li>
                })}
            </ul>
        </div>
  )
}

export default Catalogo