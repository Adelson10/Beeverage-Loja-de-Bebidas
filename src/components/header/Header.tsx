import Search from "./Search";
import ButtonIcon from "../utils/ButtonIcon";
import { Heart, ShoppingCartSimple, WechatLogo } from "@phosphor-icons/react";
import Profile from "./Profile";
import './Header.css';

const Header = () => {
    console.log(document.documentElement.style.getPropertyValue('--color'));
    
  return (
    <header>
        <div className="Logo"></div>
        <Search />
        <nav>
            <ButtonIcon>
                <ShoppingCartSimple size='1.5rem' weight="fill"/>
            </ButtonIcon>
            <ButtonIcon>
                <WechatLogo size='1.5rem' weight="fill"/>
            </ButtonIcon>
            <ButtonIcon>
                <Heart size='1.5rem' weight="fill"/>
            </ButtonIcon>
        </nav>
        <Profile />
    </header>
  )
}

export default Header;