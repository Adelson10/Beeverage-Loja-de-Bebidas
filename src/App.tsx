import Header from './components/header/Header';
import { BrowserRouter } from 'react-router-dom';
import CatalogoPageProvider from './utils/context/CatalogoPageProvider';
import CatalogoMobile from './components/MenuMobile/MenuMobile';
import { MenuProps } from './utils/ProductsMenu/ProductsMenu';
import Router from './routes/Router'
import FilterActiveProvider from './utils/context/FilterActiveProvider';
import CartProvider from './utils/context/CartProvider';
import Footer from './components/footer/footer';

function App() {
  return (
    <>
        <FilterActiveProvider>
          <CatalogoPageProvider>
            <CartProvider>
              <BrowserRouter>
              <CatalogoMobile MenuProps={MenuProps}/>
              <div className="max-w-[990px] max-[1000px]:max-w-[90%] mx-auto relative flex flex-col gap-4">
                <Header />
                    <Router />
              </div>
              <Footer />
              </BrowserRouter>
            </CartProvider>
          </CatalogoPageProvider>
        </FilterActiveProvider>
    </>
  )
}

export default App;