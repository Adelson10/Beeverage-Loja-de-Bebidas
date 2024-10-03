import { MagnifyingGlass, SlidersHorizontal } from "@phosphor-icons/react";
import ButtonIcon from "../utils/ButtonIcon";
import './Search.css';
import useMedia from "../../hooks/useMedia";
import Button from "../utils/Button";

const Search = () => {
  const desktop = true;
  
  return (
    <div className="header_search">
      { !desktop ? (
        <>
          <label htmlFor="header_search">
            <ButtonIcon className="header_search_button"><MagnifyingGlass size='1.3rem' weight="bold"/></ButtonIcon>
              <input id="header_search" type="text" placeholder="Pesquisar produto"/></label>
        </>
      ): (<>
        <label htmlFor="header_search"><input id="header_search" type="text" placeholder="Pesquisar produto"/></label>
        <ButtonIcon className="header_search_button"><MagnifyingGlass size='1.3rem' weight="bold"/></ButtonIcon>
        <Button><SlidersHorizontal size='2rem' color="white"/></Button>
      </>)
      }
    </div>
  )
}

export default Search;