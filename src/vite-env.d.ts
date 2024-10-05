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
    shadowImage: string,
    categorias: MenuCategorias[];
}

interface MenuCategorias {
    name: string;
    src: string;
}