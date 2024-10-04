import { MagnifyingGlass, SlidersHorizontal } from "@phosphor-icons/react";
import ButtonIcon from "../utils/ButtonIcon";
import './Search.css';
import Button from "../utils/Button";
import { useCurrentPage } from "../../utils/context/CurrentPage";
import React from "react";
import { useLocation } from "react-router-dom";

interface SearchProps {
  mobile: boolean | null;
}

const Search = ({mobile}: SearchProps) => {
  const location = useLocation();
  const isCatalogoRoute = location.pathname.includes('/catalogo');

  return (
    <div className="header_search">
      { !mobile ? (
        <>
          <label htmlFor="header_search">
            <input id="header_search" type="text" placeholder="Pesquisar produto"/>
          </label>
          <ButtonIcon className="header_search_button"><MagnifyingGlass size='1.3rem' weight="bold"/></ButtonIcon>
        </>
      ) : (
      <>  
        <label htmlFor="header_search">
            <ButtonIcon className="header_search_button"><MagnifyingGlass size='1.3rem' weight="bold"/></ButtonIcon>
            <input id="header_search" type="text" placeholder="Pesquisar produto"/>
        </label>
        { isCatalogoRoute && <Button><SlidersHorizontal size='2rem' color="white"/></Button>}
      </>
      )
      }
    </div>
  )
}

export default Search;