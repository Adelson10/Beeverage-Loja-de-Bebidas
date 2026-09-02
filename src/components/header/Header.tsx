import Search from "./Search";
import ButtonIcon from "../utils/ButtonIcon";
import { Heart, ShoppingCartSimple, WechatLogo } from "@phosphor-icons/react";
import Profile from "./Profile";
import Catalogo from "./Catalogo";
import useMedia from "../../hooks/useMedia";
import React from "react";
import ModalBox from "../utils/ModalBox";
import { Link } from "react-router-dom";
import LogoImg from "../../assets/Logo/Logo.png";

const MenuMobileModal: IModal[] = [
    {
        icon: <ShoppingCartSimple size='1.5rem' weight="fill"/>,
        name: 'Carrinho',
        src: '/carrinho'
    },
    {
        icon: <WechatLogo size='1.5rem' weight="fill"/>,
        name: 'Fale Conosco',
        src: '/faleconosco'
    },
    {
        icon: <Heart size='1.5rem' weight="fill"/>,
        name: 'Favoritos',
        src: '/favoritos'
    },
]

const Header = () => {    
    const mobile = useMedia(1000);
    const [menuMobile, setMenuMobile] = React.useState<boolean>(false);
    
    return (
    <>
        <header className="pt-4 min-[1000px]:mb-4">
            <div className="flex flex-wrap py-2 min-[1000px]:flex-nowrap min-[1000px]:items-center min-[1000px]:justify-between">
                { !mobile && <Link to={'/'} className="block h-[5.8rem] w-[5.8rem] bg-cover bg-center" style={{ backgroundImage: `url(${LogoImg})` }}></Link> }
                <Search mobile={mobile}/>
                { !mobile ?
                (<>
                    <nav className="order-3 flex w-auto gap-8">
                        <ButtonIcon className="p-0 text-brand-dark hover:text-brand-select">
                            <ShoppingCartSimple size='1.5rem' weight="fill"/>
                        </ButtonIcon>
                        <ButtonIcon className="p-0 text-brand-dark hover:text-brand-select">
                            <WechatLogo size='1.5rem' weight="fill"/>
                        </ButtonIcon>
                    </nav>
                </>)
                : (<>
                    <div className="order-1 flex w-1/2 items-center justify-end">
                        <button className="flex h-[30px] w-[30px] items-center justify-center">
                            <div
                                className={`relative h-[2px] w-[23px] rounded-[10px] transition-transform duration-500 before:absolute before:block before:h-[2px] before:w-[23px] before:rounded-[10px] before:transition-transform before:duration-500 before:content-[''] after:absolute after:block after:h-[2px] after:w-[23px] after:rounded-[10px] after:transition-transform after:duration-500 after:content-[''] ${
                                    menuMobile
                                        ? "bg-transparent before:translate-y-0 before:-rotate-45 before:bg-brand after:-translate-y-[2px] after:rotate-45 after:bg-brand"
                                        : "bg-primary before:-translate-y-[7px] before:bg-primary after:translate-y-[5px] after:bg-primary"
                                }`}
                                onClick={() => setMenuMobile(!menuMobile)}
                            ></div>
                        </button>
                        { menuMobile && <ModalBox modelos={MenuMobileModal}/>}
                    </div>
                </>)
                }
                <Profile />
            </div>
            <Catalogo mobile={mobile}/>
        </header>
    </>
  )
}

export default Header;