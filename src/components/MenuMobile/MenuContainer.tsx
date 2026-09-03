import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './MenuContainer.css';
import { useCatalogoPage } from '../../utils/context/CatalogoPageProvider';
import fundoTitle from '../../assets/imagens/Menu/fundo.png';

const CatalogoContainer = ({title, src, img, categorias, id}: MenuContainerProps & {id: number}) => {
    const {setCatalogoPage} = useCatalogoPage();
    const curvePathRef = useRef<SVGPathElement>(null);
    const curveTextPathRef = useRef<SVGTextPathElement>(null);

    useEffect(() => {
        const path = curvePathRef.current;
        const textPath = curveTextPathRef.current;
        if (!path || !textPath) return;

        const maxLength = path.getTotalLength() * 0.94;
        const naturalLength = textPath.getComputedTextLength();

        if (naturalLength > maxLength) {
            textPath.setAttribute('textLength', String(maxLength));
            textPath.setAttribute('lengthAdjust', 'spacingAndGlyphs');
        } else {
            textPath.removeAttribute('textLength');
            textPath.removeAttribute('lengthAdjust');
        }
    }, [title]);

    function handleClick() {
        if(document.body.style.overflowY==='hidden') {
          document.body.style.overflowY = 'scroll';
        }
        setCatalogoPage(false);
    }

    return (
    <div className='py-2'>
        <div className={`flex flex-row items-center gap-4 ${(id+1) % 2 == 1 ? '' : 'flex-row-reverse'}`}>
            <Link onClick={handleClick} to={src} className="block h-[200px] w-[130px] bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${img})`}}></Link>
            <div className='py-4 grow'>
                <div className="mx-auto w-[150px] h-10 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${fundoTitle})`}}>
                    <Link onClick={handleClick} to={src} className="block w-full h-full">
                        <svg viewBox="0 0 500 160" className="menu-title-curve w-full h-full" preserveAspectRatio="xMidYMid meet">
                            <path ref={curvePathRef} id={`curve-${id}`} d="M106.8,77.3C106.8,66.4,391.5,66.4,391.5,76.3" />
                            <text textAnchor="middle">
                                <textPath ref={curveTextPathRef} href={`#curve-${id}`} startOffset="50%">{title}</textPath>
                            </text>
                        </svg>
                    </Link>
                </div>
                <div className='p-4'>
                    {categorias.map((categoria) =>
                        <Link onClick={handleClick} key={categoria.name} to={categoria.src} className="flex gap-[0.2rem] text-primary hover:text-brand-dark">
                            <h4 className='font-normal font-[Kalam,cursive]!'>{categoria.name}</h4>
                            <div className='inline-flex grow h-[18px] items-end'>
                                <div className='w-full h-px bg-current'></div>
                            </div>
                            <h4 className='font-normal font-[Kalam,cursive]!'>$$</h4>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default CatalogoContainer;