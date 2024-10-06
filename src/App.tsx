import './App.css';
import Header from './components/header/Header';
import Catalogo from './Pages/Catalogo';
import Home from './Pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CatalogoPageProvider from './utils/context/CatalogoPageProvider';
import CatalogoMobile from './components/MenuMobile/MenuMobile';
import { MenuProps } from './utils/ProductsMenu/ProductsMenu';

function App() {
  return (
    <>
        <CatalogoPageProvider>
          <BrowserRouter>
          <CatalogoMobile MenuProps={MenuProps}/>
          <div className="App">
            <Header />
                <Routes>
                  <Route path='/' element={<Home />}/>
                  <Route path='/catalogo/:catalogo'element={<Catalogo />}/>
                  <Route path='/carrinho' element={<Home />}/>
                  <Route path='/carrinho' element={<Home />}/>
                  <Route path='/carrinho' element={<Home />}/>
                </Routes>
          </div>
          </BrowserRouter>
        </CatalogoPageProvider>
    </>
  )
}

export default App;