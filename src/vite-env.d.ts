/// <reference types="vite/client" />

interface IModal {
    icon: React.ReactElement;
    name: string;
    src: string;
}

interface CatalogoContainerProps {
    title: string;
    src: string;
    img: string;
    shadowImage: string,
    categorias: CatalogoCategorias[];
}

interface CatalogoCategorias {
    name: string;
    src: string;
}