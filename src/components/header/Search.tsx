import { MagnifyingGlass } from "@phosphor-icons/react";
import ButtonIcon from "../utils/ButtonIcon";

const Search = () => {
  return (
    <div>
      <input type="text" />
      <ButtonIcon><MagnifyingGlass weight="light"/></ButtonIcon>
    </div>
  )
}

export default Search;