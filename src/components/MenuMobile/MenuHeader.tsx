import { useCatalogoPage } from '../../utils/context/CatalogoPageProvider';
import { Link } from 'react-router-dom';
import logoBg from '../../assets/imagens/Menu/Fundo_Logo.png';
import logoMenu from '../../assets/Logo/Logo_Menu.png';

const MenuHeader = () => {
  const {setCatalogoPage} = useCatalogoPage();
  function handleClick() {
    if(document.body.style.overflowY==='hidden') {
      document.body.style.overflowY = 'scroll';
    }

    setCatalogoPage(false);
  }

  return (
    <div className='w-full h-full mb-4'>
        <div className="bg-contain bg-no-repeat w-[170px] h-[130px] mx-auto flex flex-col items-center justify-center" style={{backgroundImage: `url(${logoBg})`}}>
            <Link onClick={handleClick} className="block h-[85px] w-[85px] bg-cover bg-center mt-[0.8rem]" to={'/'} style={{backgroundImage: `url(${logoMenu})`}}></Link>
            <h1 className='text-[1.7rem] leading-[1] text-brand-menu font-bebidas font-normal'>MENU</h1>
        </div>
    </div>
  )
}

export default MenuHeader;