/// <reference types="vite/client" />

interface IModal {
    icon: React.ReactElement;
    name: string;
    src: string;
}

interface MenuContainerProps {
    title: string;
    src: string;
    img: string;
    categorias: MenuCategorias[];
}

interface MenuCategorias {
    name: string;
    src: string;
}

interface productModal {
    code: string;
    image: ImageProductModal;
    score: number;
    name: string;
    volume: number;
    priceNow: number;
    price: number;
}

type ImageProductModal = {
    src: string;
    shadowWidth: number;
}