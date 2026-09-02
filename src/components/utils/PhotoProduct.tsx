import PhotoMold from '../../assets/imagens/PhotoMold/PhotoMold';

interface PhotoProductProps {
    color1: string;
    color2: string;
    shadowImage: number;
    srcImg: string;
    type?: string;
}

const PhotoProduct = ({color1 ,color2 ,shadowImage, srcImg, type = '' }: PhotoProductProps) => {
    const isPage = type === 'Page';

  return (
    <div className={`group inline-flex relative justify-center items-end ${isPage ? 'h-[330px] w-[330px]' : 'h-[160px]'}`}>
        <PhotoMold height={`${type == 'Page' ? 135*2 : 135}px`} width={`${type == 'Page' ? 155*2 : 155}px`} color1={color1} color2={color2}/>
        <div style={{width: `${type == 'Page' ? shadowImage*2 : shadowImage}px`}} className="absolute bg-[rgba(0,0,0,0.274)] h-[13px] rounded-[50%] bottom-[4px] blur-[3px]"></div>
        <div style={{backgroundImage: `url(${srcImg})`}} className={`absolute bg-contain bg-center bg-no-repeat bottom-[5px] [transition:bottom_.1s_ease] ${isPage ? 'h-[310px] w-[250px]' : 'h-[155px] w-[125px] group-hover:bottom-[15px]'}`}></div>
    </div>
  )
}

export default PhotoProduct;