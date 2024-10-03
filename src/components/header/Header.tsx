import Search from "./Search";
import ButtonIcon from "../utils/ButtonIcon";
import { Heart, ShoppingCartSimple, WechatLogo } from "@phosphor-icons/react";
import Profile from "./Profile";
import './Header.css';
import Catalogo from "./Catalogo";
import useMedia from "../../hooks/useMedia";

const Header = () => {    
    const mobile = useMedia('(max-width: 1000px)');
    
    return (
    <>
        <header>
            <div className="Header">
                {!mobile && <div className="Logo"></div>}
                <Search mobile={mobile}/>
                <nav>
                    <ButtonIcon className="icons">
                        <ShoppingCartSimple size='1.5rem' weight="fill"/>
                    </ButtonIcon>
                    <ButtonIcon className="icons">
                        <WechatLogo size='1.5rem' weight="fill"/>
                    </ButtonIcon>
                    <ButtonIcon className="icons">
                        <Heart size='1.5rem' weight="fill"/>
                    </ButtonIcon>
                </nav>
                <Profile />
            </div>
            <Catalogo />
        </header>
    </>
  )
}

export default Header;