import React from 'react';
import './ModalCatalogo.css';
import { Link } from 'react-router-dom';

const ModalCatalogo = ({MenuProps}: {MenuProps: MenuContainerProps[]}) => {
  return (
    <div className='ModalCatalogo_Container'>
        <ul>
            {MenuProps.map((catalogo) => 
                <>
                    <li><Link to={catalogo.src}>{catalogo.title}</Link></li>
                    <ul>
                        {catalogo.categorias.map((catalogo) => 
                            <li><Link to={catalogo.src}>{catalogo.name}</Link></li>
                        )}
                    </ul>
                </>
            )}
        </ul>
    </div>
  )
}

export default ModalCatalogo;