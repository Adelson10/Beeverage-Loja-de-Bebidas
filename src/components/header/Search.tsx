import { MagnifyingGlass, SlidersHorizontal } from "@phosphor-icons/react";
import ButtonIcon from "../utils/ButtonIcon";
import Button from "../utils/Button";
import { useLocation } from "react-router-dom";
import { useFilterActive } from "../../utils/context/FilterActiveProvider";

interface SearchProps {
  mobile: boolean | null;
}

const Search = ({mobile}: SearchProps) => {
  const location = useLocation();
  const isCatalogoRoute = location.pathname.includes('/catalogo');
  const {filterActive, setFilterActive} = useFilterActive();

  return (
    <div className="order-2 my-4 flex h-16 w-full items-center gap-4 min-[1000px]:m-0 min-[1000px]:h-auto min-[1000px]:w-auto">
      { !mobile ? (
        <>
          <label htmlFor="header_search" className="inline-flex h-full w-full items-center gap-2 rounded-[0.4rem] bg-white px-4 min-[1000px]:w-auto min-[1000px]:bg-transparent min-[1000px]:p-0">
            <input id="header_search" type="text" placeholder="Pesquisar produto" className="w-full bg-transparent text-[0.9rem] min-[1000px]:w-[270px] min-[1000px]:border-b min-[1000px]:border-b-primary min-[1000px]:py-2 min-[1000px]:transition-colors min-[1000px]:duration-200 min-[1000px]:placeholder:text-[0.9rem] min-[1000px]:focus:border-b-brand-dark"/>
          </label>
          <ButtonIcon className="text-primary min-[1000px]:inline-flex min-[1000px]:items-center min-[1000px]:transition-colors min-[1000px]:duration-200 min-[1000px]:hover:text-brand-dark min-[1000px]:active:text-brand-select"><MagnifyingGlass size='1.3rem' weight="bold"/></ButtonIcon>
        </>
      ) : (
      <>
        <label htmlFor="header_search" className="inline-flex h-full w-full items-center gap-2 rounded-[0.4rem] bg-white px-4">
            <ButtonIcon className="text-primary"><MagnifyingGlass size='1.3rem' weight="bold"/></ButtonIcon>
            <input id="header_search" type="text" placeholder="Pesquisar produto" className="w-full bg-transparent text-[0.9rem]"/>
        </label>
        { isCatalogoRoute && <Button style={{background: filterActive ? 'linear-gradient(-68deg, var(--color-brand-dark) 0%, var(--color-brand) 100%)' : 'white'}} onClick={() => setFilterActive(filterActive => !filterActive)}><SlidersHorizontal size='2rem' color={filterActive ? 'white' : 'var(--color-brand)'}/></Button>}
      </>
      )
      }
    </div>
  )
}

export default Search;