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
    id: number;
    thumbnail: ImageProductModal;
    imagens: string[];
    score: number;
    name: string;
    volume: string;
    priceNow: number;
    price: number;
    categoria: string;
    reviews: number;
    meta_description: string;
    filter: string[]
}

type ImageProductModal = {
    src: string;
    shadowWidth: number;
}

interface ModalFilterProducts {
    title: string;
    filters: string[];
}