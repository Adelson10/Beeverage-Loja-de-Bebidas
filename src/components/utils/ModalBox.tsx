import { useNavigate } from 'react-router-dom';
import ButtonIcon from './ButtonIcon';
import './ModalBox.css';
import LogoImg from '../../assets/Logo/Logo.png';

interface IModalBox {
    primary: IModal[];
    secondary: IModal[];
    onClose: () => void;
}

function ModalBox({primary, secondary, onClose}: IModalBox) {
    const navigate = useNavigate();

    function handleClose() {
        if(document.body.style.overflowY==='hidden') {
            document.body.style.overflowY = 'scroll';
        }
        onClose();
    }

    function handleNavigate(src: string) {
        handleClose();
        navigate(src);
    }

    return (
        <div className="animate-[ModalSlideIn_350ms_ease-out_forwards] fixed inset-0 z-[989] flex h-dvh w-screen flex-col gap-4 overflow-y-scroll bg-bg p-4 [&::-webkit-scrollbar]:hidden">
            <button className="flex items-center rounded-[8px] px-4 py-3" onClick={() => handleNavigate('/')}>
                <div className="h-[5rem] w-[5rem] bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${LogoImg})`}}></div>
            </button>

            <nav className="flex flex-col rounded-[8px] py-2">
                { primary.map((modelo) =>
                    <ButtonIcon key={modelo.name} onClick={() => handleNavigate(modelo.src)} className="flex items-center gap-3 py-3 px-4 font-semibold text-brand-dark hover:text-brand-select">
                        {modelo.icon}{modelo.name}
                    </ButtonIcon>
                )}
            </nav>

            <nav className="flex flex-col rounded-[8px] py-2">
                { secondary.map((modelo) =>
                    <ButtonIcon key={modelo.name} onClick={() => handleNavigate(modelo.src)} className="flex items-center gap-3 py-3 px-4 font-normal text-brand hover:text-brand-dark">
                        {modelo.icon}{modelo.name}
                    </ButtonIcon>
                )}
            </nav>
        </div>
    )
}

export default ModalBox;
