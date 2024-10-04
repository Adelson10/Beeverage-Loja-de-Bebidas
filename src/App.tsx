import './App.css';
import Header from './components/header/Header';
import Catalogo from './Pages/Catalogo';
import Home from './Pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CurrentPage from './utils/context/CurrentPage';

function App() {

  return (
    <>
        <CurrentPage>
          <BrowserRouter>
          <Header />
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/catalogo/:catalogo'element={<Catalogo />}/>
              <Route path='/carrinho' element={<Home />}/>
              <Route path='/carrinho' element={<Home />}/>
              <Route path='/carrinho' element={<Home />}/>
            </Routes>
          </BrowserRouter>
        </CurrentPage>
    </>
  )
}

export default App;