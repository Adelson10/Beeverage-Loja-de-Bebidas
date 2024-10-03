import { MagnifyingGlass, SlidersHorizontal } from "@phosphor-icons/react";
import ButtonIcon from "../utils/ButtonIcon";
import './Search.css';
import Button from "../utils/Button";
import { useHref } from "react-router-dom";

interface SearchProps {
  mobile: boolean | null;
}

const Search = ({mobile}: SearchProps) => {
  const path = useHref();
  
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
        {path!=='/' && <Button><SlidersHorizontal size='2rem' color="white"/></Button>}
      </>
      )
      }
    </div>
  )
}

export default Search;