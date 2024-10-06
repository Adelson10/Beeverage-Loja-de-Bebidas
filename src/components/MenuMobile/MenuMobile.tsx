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
                src: '/catalogo/vinhos/vinhosTintos',
            },
            {
                name: 'Vinhos Brancos',
                src: '/catalogo/vinhos/vinhosBrancos',
            },
            {
                name: 'Vinhos Rosés',
                src: '/catalogo/vinhos/vinhosRoses',
            },
            {
                name: 'Vinhos de Sobremesa',
                src: '/catalogo/vinhos/vinhosDeSobremesa',
            },
            {
                name: 'Vinhos Espumantes',
                src: '/catalogo/vinhos/vinhosEspumantes',
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
                src: '/catalogo/destilados/uisque',
            },
            {
                name: 'Vodka',
                src: '/catalogo/destilados/vodka',
            },
            {
                name: 'Rum',
                src: '/catalogo/destilados/rum',
            },
            {
                name: 'Tequila e Mezcal',
                src: '/catalogo/destilados/tequilaMezcal',
            },
            {
                name: 'Cachaça',
                src: '/catalogo/destilados/cachaca',
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
                src: '/catalogo/gin/londonDryGin',
            },
            {
                name: 'Gin Floral',
                src: '/catalogo/gin/ginFloral',
            },
            {
                name: 'Gin Saborizado',
                src: '/catalogo/gin/ginSaborizado',
            },
            {
                name: 'Gin Old Tom',
                src: '/catalogo/gin/ginOldTom',
            },
            {
                name: 'Gin Navy Strength',
                src: '/catalogo/gin/ginNavyStrength',
            },
            {
                name: 'Gin Artesanal',
                src: '/catalogo/gin/ginArtesanal',
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
                src: '/catalogo/petiscos/friosQueijos',
            },
            {
                name: 'Petiscos de Boteco',
                src: '/catalogo/petiscos/petiscosDeBoteco',
            },
            {
                name: 'Carnes e Grelhados',
                src: '/catalogo/petiscos/carnesGrelhados',
            },
            {
                name: 'Frutos do Mar',
                src: '/catalogo/petiscos/frutosDoMar',
            },
            {
                name: 'Vegetarianos',
                src: '/catalogo/petiscos/vegetarianos',
            },
            {
                name: 'Snacks Rápidos',
                src: '/catalogo/petiscos/snacksRápidos',
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