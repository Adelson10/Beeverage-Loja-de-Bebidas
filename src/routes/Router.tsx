import Catalogo from "../Pages/Catalogo";
import Home from "../Pages/Home";
import { Routes, Route } from 'react-router-dom';

const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/catalogo/:catalogo'element={<Catalogo />}/>
        <Route path='/carrinho' element={<Home />}/>
        <Route path='/carrinho' element={<Home />}/>
        <Route path='/carrinho' element={<Home />}/>
    </Routes>
  )
}

export default Router;