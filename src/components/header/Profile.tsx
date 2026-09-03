import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package, Person, SignOut, User } from "@phosphor-icons/react";
import { useAuth } from "../../utils/context/AuthProvider";
import useMedia from "../../hooks/useMedia";

const ProfileMenu: IModal[] = [
  {
    icon: <Package size="1.25rem" />,
    name: 'Meus Pedidos',
    src: '/pedidos'
  },
  {
    icon: <User size="1.25rem" />,
    name: 'Meus Dados',
    src: '/meus-dados'
  },
];

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const mobile = useMedia(1000);
  const [showMenu, setShowMenu] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!showMenu) return;

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu]);

  function handleLogout() {
    setShowMenu(false);
    logout();
    navigate('/');
  }

  if (!user) {
    return (
      <div className="flex w-1/2 items-center min-[1000px]:w-auto min-[1000px]:order-4">
        <Link to="/login">
          <p className="text-brand-dark min-[1000px]:text-end">Olá,</p>
          <h3 className="font-semibold text-brand-dark text-[1rem] hover:underline">Faça Login</h3>
        </Link>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative flex w-1/2 items-center min-[1000px]:w-auto min-[1000px]:order-4">
      <button type="button" onClick={() => setShowMenu(!showMenu)} className="flex items-center gap-2 border-none bg-transparent cursor-pointer" disabled={mobile}>
        <div className="h-[60px] w-[60px] rounded-lg bg-brand-dark min-[1000px]:order-2"></div>
        <div className="text-start min-[1000px]:order-1 min-[1000px]:text-end">
          <p className="text-brand-dark">Olá,</p>
          <h3 className="font-semibold text-brand-dark text-[1.17rem]">{user.nome}</h3>
        </div>
      </button>

      { showMenu &&
        <ul className="absolute top-full right-0 z-20 flex w-[200px] animate-[ModalCatalogo_300ms_forwards] flex-col gap-1 rounded-lg bg-white p-2 shadow-[0px_0px_8px_rgba(0,0,0,0.15)]">
          { ProfileMenu.map((item) =>
            <li key={item.name}>
              <Link to={item.src} onClick={() => setShowMenu(false)} className="flex items-center gap-3 rounded-lg px-3 py-2 font-normal text-brand no-underline hover:bg-bg">
                {item.icon}{item.name}
              </Link>
            </li>
          )}
          <li>
            <button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg border-none bg-transparent px-3 py-2 ont-normal text-brand hover:bg-bg">
              <SignOut size="1.25rem" />Logout
            </button>
          </li>
        </ul>
      }
    </div>
  )
}

export default Profile;
