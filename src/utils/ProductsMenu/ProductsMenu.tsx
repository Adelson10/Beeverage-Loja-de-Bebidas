import Cerveja from '../../assets/imagens/Menu/cervejas.png';
import Vinhos from '../../assets/imagens/Menu/vinho.png';
import Deslitados from '../../assets/imagens/Menu/vodka.png';
import Espumante from '../../assets/imagens/Menu/espumante.png';
import Gin from '../../assets/imagens/Menu/gin.png';
import Petiscos from '../../assets/imagens/Menu/petiscos.png';
import { BeerStein, Martini, BeerBottle, Champagne, Brandy, ForkKnife } from '@phosphor-icons/react';

export const sizeIcon = '1.3rem';

export const MenuProps: MenuContainerProps[]  = [
    {
        title: 'Cervejas',
        src: '/catalogo/cervejas',
        img: Cerveja,
        categorias: [
            {
                name: 'Lager',
                src: '/catalogo/cervejas?filter=Lager',
            },
            {
                name: 'Long',
                src: '/catalogo/cervejas?filter=Long',
            },
            {
                name: 'Pilsen',
                src: '/catalogo/cervejas?filter=Pilsen',
            },
            {
                name: 'IPA (India Pale Ale)',
                src: '/catalogo/cervejas?filter=IPA',
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
                src: '/catalogo/vinhos?filter=VinhosTintos',
            },
            {
                name: 'Vinhos Brancos',
                src: '/catalogo/vinhos?filter=VinhosBrancos',
            },
            {
                name: 'Vinhos Rosés',
                src: '/catalogo/vinhos?filter=VinhosRoses',
            },
            {
                name: 'Vinhos de Sobremesa',
                src: '/catalogo/vinhos?filter=VinhosDeSobremesa',
            },
            {
                name: 'Vinhos Espumantes',
                src: '/catalogo/vinhos?filter=VinhosEspumantes',
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
                src: '/catalogo/destilados?filter=Uísque',
            },
            {
                name: 'Vodka',
                src: '/catalogo/destilados?filter=Vodka',
            },
            {
                name: 'Rum',
                src: '/catalogo/destilados?filter=Rum',
            },
            {
                name: 'Tequila e Mezcal',
                src: '/catalogo/destilados?filter=TequilaEMezcal',
            },
            {
                name: 'Cachaça',
                src: '/catalogo/destilados?filter=Cachaça',
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
                src: '/catalogo/espumantes?filter=Champagne',
            },
            {
                name: 'Prosecco',
                src: '/catalogo/espumantes?filter=Prosecco',
            },
            {
                name: 'Cava',
                src: '/catalogo/espumantes?filter=Cava',
            },
            {
                name: 'Espumante Brasileiro',
                src: '/catalogo/espumantes?filter=EspumanteBrasileiro',
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
                src: '/catalogo/gin?filter=LondonDryGin',
            },
            {
                name: 'Gin Floral',
                src: '/catalogo/gin?filter=GinFloral',
            },
            {
                name: 'Gin Saborizado',
                src: '/catalogo/gin?filter=GinSaborizado',
            },
            {
                name: 'Gin Old Tom',
                src: '/catalogo/gin?filter=GinOldTom',
            },
            {
                name: 'Gin Navy Strength',
                src: '/catalogo/gin?filter=GinNavyStrength',
            },
            {
                name: 'Gin Artesanal',
                src: '/catalogo/gin?filter=GinArtesanal',
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
                src: '/catalogo/petiscos?filter=FriosEQueijos',
            },
            {
                name: 'Petiscos de Boteco',
                src: '/catalogo/petiscos?filter=PetiscosDeBoteco',
            },
            {
                name: 'Carnes e Grelhados',
                src: '/catalogo/petiscos?filter=CarnesEGrelhados',
            },
            {
                name: 'Frutos do Mar',
                src: '/catalogo/petiscos?filter=FrutosDoMar',
            },
            {
                name: 'Vegetarianos',
                src: '/catalogo/petiscos?filter=Vegetarianos',
            },
            {
                name: 'Snacks Rápidos',
                src: '/catalogo/petiscos?filter=SnacksRápidos',
            },
        ]
    },
];

interface IQuickAcess {
    icon: React.ReactElement;
    name: string;
    src: string;
}

export const QuickAcess: IQuickAcess[] = [
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