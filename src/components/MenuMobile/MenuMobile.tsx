import { useCatalogoPage } from '../../utils/context/CatalogoPageProvider.tsx';
import CatalogoContainer from './MenuContainer.tsx';
import MenuHeader from './MenuHeader.tsx';
import { X } from '@phosphor-icons/react';
import cevadaBg from '../../assets/imagens/Menu/cevada_background.png';
import footer1 from '../../assets/imagens/Menu/footer_01.png';
import footer2 from '../../assets/imagens/Menu/footer_02.png';

const CatalogoMobile = ({MenuProps}: {MenuProps: MenuContainerProps[]}) => {
    const { CatalogoPage, setCatalogoPage } = useCatalogoPage();

    function handleClick() {
        if(document.body.style.overflowY==='hidden') {
          document.body.style.overflowY = 'scroll';
        }
        setCatalogoPage(false);
    }

  if (CatalogoPage) return (
    <div className="inset-0 w-screen h-dvh bg-bg pt-4 fixed z-[989] overflow-y-scroll overflow-x-hidden [&::-webkit-scrollbar]:hidden">
        <div className="absolute w-full h-full top-0 z-[991]">
            <div className="absolute block h-[100px] w-[170px] bg-cover left-0 [transform:rotateZ(100deg)_translate(55px,40px)]" style={{backgroundImage: `url(${cevadaBg})`}}></div>
            <div className="absolute block h-[100px] w-[170px] bg-cover right-0 [transform:rotateZ(-100deg)_translate(-55px,40px)_scaleX(-1)]" style={{backgroundImage: `url(${cevadaBg})`}}></div>
        </div>
        <div className="w-[90%] mx-auto relative z-[992]">
            <MenuHeader />
            <div className='flex flex-col gap-4'>
                {MenuProps.map((catalogo, index) =>
                    <CatalogoContainer key={catalogo.title} img={catalogo.img} id={index} title={catalogo.title} src={catalogo.src} categorias={catalogo.categorias}/>
                )}
            </div>
            <div className="w-full flex justify-around pb-16">
                <div className="w-[90px] h-[60px] bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${footer1})`}}></div>
                <div className="w-[90px] h-[60px] bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${footer2})`}}></div>
                <div className="w-[90px] h-[60px] bg-contain bg-no-repeat bg-center -scale-x-100" style={{backgroundImage: `url(${footer1})`}}></div>
            </div>
        </div>
        <button onClick={handleClick} className="absolute right-4 top-4 z-[996] text-brand-dark"><X size={'2rem'} fill='bold'/></button>
    </div>
  )
}

export default CatalogoMobile;