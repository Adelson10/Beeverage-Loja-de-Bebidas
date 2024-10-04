/// <reference types="vite/client" />

interface IModal {
    icon: React.ReactElement;
    name: string;
    src: string;
}

interface ValueProps {
    currentPage: string;
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  }