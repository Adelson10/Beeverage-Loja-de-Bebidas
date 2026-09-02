import { useNavigate } from 'react-router-dom';
import ButtonIcon from './ButtonIcon';
import './ModalBox.css';

interface IModalBox {
    modelos: IModal[];
}

function ModalBox({modelos}: IModalBox) {
    const navigate = useNavigate();
  return (
    <nav className="animate-[Modal_500ms_forwards] absolute flex flex-col w-fit bg-bg shadow-[0px_0px_8px_rgba(0,0,0,0.233)] rounded-[5px] py-[0.3rem] px-0">
        { modelos.map((modelo) =>
            <ButtonIcon key={modelo.name} onClick={() => navigate(modelo.src)} className="text-primary flex items-center gap-2 py-2 px-4 hover:text-brand-dark min-[1000px]:text-brand-dark min-[1000px]:p-0 min-[1000px]:hover:text-brand-select">
                {modelo.icon}{modelo.name}
            </ButtonIcon>
        )}
    </nav>
  )
}

export default ModalBox;