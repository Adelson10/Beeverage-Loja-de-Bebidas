import { useCatalogoPage } from '../../utils/context/CatalogoPageProvider.tsx';
import './MenuMobile.css';
import CatalogoContainer from './MenuContainer.tsx';
import Cerveja from '../../assets/imagens/Menu/cervejas.png';
import Vinhos from '../../assets/imagens/Menu/vinho.png';
import Deslitados from '../../assets/imagens/Menu/vodka.png';
import Espumante from '../../assets/imagens/Menu/espumante.png';
import Gin from '../../assets/imagens/Menu/gin.png';
import Petiscos from '../../assets/imagens/Menu/petiscos.png';
import MenuHeader from './MenuHeader.tsx';
import { X } from '@phosphor-icons/react';

const MenuProps: MenuContainerProps[]  = [
    {
        title: 'Cervejas',
        src: '/catalogo/cervejas',
        img: Cerveja,
        categorias: [
            {
                name: 'Lager',
                src: '/catalogo/cervejas/lager',
            },
            {
                name: 'Ale',
                src: '/catalogo/cervejas/ale',
            },
            {
                name: 'Pilsen',
                src: '/catalogo/cervejas/pilsen',
            },
            {
                name: 'IPA (India Pale Ale)',
                src: '/catalogo/cervejas/ipa',
            },
        ]
    },
    {
        title: 'Vinhos',
        src: '/catalogo/vinhos',
        img: Vinhos,
        categorias: [
            {
                name: 'Vinhos Tintos',
                src: '/catalogo/cervejas/vinhosTintos',
            },
            {
                name: 'Vinhos Brancos',
                src: '/catalogo/cervejas/vinhosBrancos',
            },
            {
                name: 'Vinhos Rosés',
                src: '/catalogo/cervejas/vinhosRoses',
            },
            {
                name: 'Vinhos de Sobremesa',
                src: '/catalogo/cervejas/vinhosDeSobremesa',
            },
            {
                name: 'Vinhos Espumantes',
                src: '/catalogo/cervejas/vinhosEspumantes',
            },
        ]
    },
    {
        title: 'Destilados',
        src: '/catalogo/destilados',
        img: Deslitados,
        categorias: [
            {
                name: 'Uísque',
                src: '/catalogo/cervejas/uisque',
            },
            {
                name: 'Vodka',
                src: '/catalogo/cervejas/vodka',
            },
            {
                name: 'Rum',
                src: '/catalogo/cervejas/rum',
            },
            {
                name: 'Tequila e Mezcal',
                src: '/catalogo/cervejas/tequilaMezcal',
            },
            {
                name: 'Cachaça',
                src: '/catalogo/cervejas/cachaca',
            },
        ]
    },
    {
        title: 'Espumantes',
        src: '/catalogo/espumantes',
        img: Espumante,
        categorias: [
            {
                name: 'Champagne',
                src: '/catalogo/espumantes/champagne',
            },
            {
                name: 'Prosecco',
                src: '/catalogo/espumantes/prosecco',
            },
            {
                name: 'Cava',
                src: '/catalogo/espumantes/cava',
            },
            {
                name: 'Espumante Brasileiro',
                src: '/catalogo/espumantes/espumanteBrasileiro',
            },
        ]
    },
    {
        title: 'Gin',
        src: '/catalogo/gin',
        img: Gin,
        categorias: [
            {
                name: 'London Dry Gin',
                src: '/catalogo/cervejas/londonDryGin',
            },
            {
                name: 'Gin Floral',
                src: '/catalogo/cervejas/ginFloral',
            },
            {
                name: 'Gin Saborizado',
                src: '/catalogo/cervejas/ginSaborizado',
            },
            {
                name: 'Gin Old Tom',
                src: '/catalogo/cervejas/ginOldTom',
            },
            {
                name: 'Gin Navy Strength',
                src: '/catalogo/cervejas/ginNavyStrength',
            },
            {
                name: 'Gin Artesanal',
                src: '/catalogo/cervejas/ginArtesanal',
            },
        ]
    },
    {
        title: 'Petiscos',
        src: '/catalogo/petiscos',
        img: Petiscos,
        categorias: [
            {
                name: 'Frios e Queijos',
                src: '/catalogo/cervejas/friosQueijos',
            },
            {
                name: 'Petiscos de Boteco',
                src: '/catalogo/cervejas/petiscosDeBoteco',
            },
            {
                name: 'Carnes e Grelhados',
                src: '/catalogo/cervejas/carnesGrelhados',
            },
            {
                name: 'Frutos do Mar',
                src: '/catalogo/cervejas/frutosDoMar',
            },
            {
                name: 'Vegetarianos',
                src: '/catalogo/cervejas/vegetarianos',
            },
            {
                name: 'Snacks Rápidos',
                src: '/catalogo/cervejas/snacksRápidos',
            },
        ]
    },
]

const CatalogoMobile = () => {
    const { CatalogoPage, setCatalogoPage } = useCatalogoPage();
  
  if (CatalogoPage) return (
    <div className='MenuMobile_Container'>
        <div className="MenuMobile_Container_Bg">
            <div className="MenuMobile_Container_Bg_Cevada left"></div>
            <div className="MenuMobile_Container_Bg_Cevada right"></div>
        </div>
        <div className='MenuvMobile_Header'>
            <MenuHeader />
            <div className='AllCatalogoProduct'>
                {MenuProps.map((catalogo, index) => 
                    <CatalogoContainer key={catalogo.title} img={catalogo.img} id={index} title={catalogo.title} src={catalogo.src} categorias={catalogo.categorias}/>
                )}
            </div>
            <div className="MenuMobile_footer">
                <div className='MenuMobile_footer_Image1'></div>
                <div className='MenuMobile_footer_Image2'></div>
                <div className='MenuMobile_footer_Image1 reverse'></div>
            </div>
        </div>
        <button onClick={() => setCatalogoPage(false)} className="MenuMobile_Close"><X size={'2rem'} fill='bold'/></button>
    </div>
  )
}

export default CatalogoMobile;