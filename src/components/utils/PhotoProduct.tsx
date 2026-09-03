import PhotoMold from '../../assets/imagens/PhotoMold/PhotoMold';

interface PhotoProductProps {
    color1: string;
    color2: string;
    shadowImage: number;
    srcImg: string;
    type?: 'Page' | 'Carrinho' | '';
}

const PhotoProduct = ({color1 ,color2 ,shadowImage, srcImg, type = '' }: PhotoProductProps) => {
    const isPage = type === 'Page';
    const isCarrinho = type === 'Carrinho';

    const containerClass = isPage ? 'h-[330px] w-[330px]' : isCarrinho ? 'h-[110px]' : 'h-[160px]';
    const moldHeight = isPage ? 135 * 2 : isCarrinho ? 135 * 0.7 : 135;
    const moldWidth = isPage ? 155 * 2 : isCarrinho ? 155 * 0.7 : 155;
    const shadowWidth = isPage ? shadowImage * 2 : isCarrinho ? shadowImage * 0.7 : shadowImage;
    const imageClass = isPage ? 'h-[310px] w-[250px]' : isCarrinho ? 'h-[108px] w-[87px] group-hover:bottom-[12px]' : 'h-[155px] w-[125px] group-hover:bottom-[15px]';

  return (
    <div className={`group inline-flex relative justify-center items-end ${containerClass}`}>
        <PhotoMold height={`${moldHeight}px`} width={`${moldWidth}px`} color1={color1} color2={color2}/>
        <div style={{width: `${shadowWidth}px`}} className="absolute bg-[rgba(0,0,0,0.274)] h-[13px] rounded-[50%] bottom-[4px] blur-[3px]"></div>
        <div style={{backgroundImage: `url(${srcImg})`}} className={`absolute bg-contain bg-center bg-no-repeat bottom-[5px] [transition:bottom_.1s_ease] ${imageClass}`}></div>
    </div>
  )
}

export default PhotoProduct;