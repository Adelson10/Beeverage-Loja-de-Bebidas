import { useCatalogoPage } from '../../utils/context/CatalogoPageProvider.tsx';
import './MenuMobile.css';
import CatalogoContainer from './MenuContainer.tsx';
import Cerveja from '../../assets/imagens/Produto/Cervejas.png';
import Vinhos from '../../assets/imagens/Produto/Vinhos.png';
import Deslitados from '../../assets/imagens/Produto/Vodka.png';
import Espumante from '../../assets/imagens/Produto/Espumante.png';
import Gin from '../../assets/imagens/Produto/Gin.png';
import Petiscos from '../../assets/imagens/Produto/Frios.png';
import MenuHeader from './MenuHeader.tsx';

const MenuProps: MenuContainerProps[]  = [
    {
        title: 'Cervejas',
        src: '/cervejas',
        img: Cerveja,
        shadowImage: '100px',
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
        src: '/vinhos',
        img: Vinhos,
        shadowImage: '80px',
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
        src: '/destilados',
        img: Deslitados,
        shadowImage: '50px',
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
        src: '/espumantes',
        img: Espumante,
        shadowImage: '50px',
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
        src: '/gin',
        img: Gin,
        shadowImage: '55px',
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
        src: '/petiscos',
        img: Petiscos,
        shadowImage: '100px',
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
    const { CatalogoPage } = useCatalogoPage();
  
  if (CatalogoPage) return (
    <div className='MenuMobile_Container'>
        <div className='MenuvMobile_Header'>
            <MenuHeader />
            <div className='AllCatalogoProduct'>
                {MenuProps.map((catalogo, index) => 
                    <CatalogoContainer key={catalogo.title} img={catalogo.img} id={index} shadowImage={catalogo.shadowImage} title={catalogo.title} src={catalogo.src} categorias={catalogo.categorias}/>
                )}
            </div>
        </div>
    </div>
  )
}

export default CatalogoMobile;