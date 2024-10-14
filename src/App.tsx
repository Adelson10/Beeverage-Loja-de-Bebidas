import './App.css';
import Header from './components/header/Header';
import { BrowserRouter } from 'react-router-dom';
import CatalogoPageProvider from './utils/context/CatalogoPageProvider';
import CatalogoMobile from './components/MenuMobile/MenuMobile';
import { MenuProps } from './utils/ProductsMenu/ProductsMenu';
import Router from './routes/Router'

function App() {
  return (
    <>
        <CatalogoPageProvider>
          <BrowserRouter>
          <CatalogoMobile MenuProps={MenuProps}/>
          <div className="App">
            <Header />
                <Router />
          </div>
          </BrowserRouter>
        </CatalogoPageProvider>
    </>
  )
}

export default App;