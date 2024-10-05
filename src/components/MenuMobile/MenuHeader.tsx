import { useCatalogoPage } from '../../utils/context/CatalogoPageProvider';
import './MenuHeader.css';
import { Link } from 'react-router-dom';

const MenuHeader = () => {
  const {setCatalogoPage} = useCatalogoPage();

  return (
    <div className='MenuHeader'>
        <div className='MenuHeader_Logo_bg'>
            <Link onClick={() => setCatalogoPage(false)} className='MenuHeader_Logo' to={'/'}></Link>
            <h1 className='MenuHeader_Logo_Title MenuTitle'>MENU</h1>
        </div>
    </div>
  )
}

export default MenuHeader;