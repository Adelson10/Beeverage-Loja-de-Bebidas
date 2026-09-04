import Catalogo from "../Pages/Catalogo";
import Home from "../Pages/Home";
import { Routes, Route } from 'react-router-dom';
import Produto from "../Pages/Produto";
import Carrinho from "../Pages/Carrinho";
import Login from "../Pages/Login";
import Pedidos from "../Pages/Pedidos";

const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/catalogo/:catalogo'element={<Catalogo />}/>
        <Route path='/produto/:catalogo/:id/:produto'element={<Produto />}/>
        <Route path='/carrinho' element={<Carrinho />}/>
        <Route path='/pedidos' element={<Pedidos />}/>
        <Route path='/login' element={<Login />}/>
    </Routes>
  )
}

export default Router;