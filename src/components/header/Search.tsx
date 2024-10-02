import { MagnifyingGlass } from "@phosphor-icons/react";
import ButtonIcon from "../utils/ButtonIcon";
import './Search.css';

const Search = () => {
  return (
    <div className="header_search">
      <label htmlFor="header_search"><input id="header_search" type="text" placeholder="Pesquisar produto"/></label>
      <ButtonIcon className="header_search_button"><MagnifyingGlass size='1.3rem' weight="bold"/></ButtonIcon>
    </div>
  )
}

export default Search;