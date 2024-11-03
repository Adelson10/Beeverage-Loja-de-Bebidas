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
    volume: string;
    priceNow: number;
    price: number;
    categoria: string;
}

type ImageProductModal = {
    src: string;
    shadowWidth: number;
}

interface ModalFilterProducts {
    title: string;
    filters: string[];
}