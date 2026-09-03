import Header from './components/header/Header';
import { BrowserRouter, useLocation } from 'react-router-dom';
import CatalogoPageProvider from './utils/context/CatalogoPageProvider';
import CatalogoMobile from './components/MenuMobile/MenuMobile';
import { MenuProps } from './utils/ProductsMenu/ProductsMenu';
import Router from './routes/Router'
import FilterActiveProvider from './utils/context/FilterActiveProvider';
import CartProvider from './utils/context/CartProvider';
import AuthProvider from './utils/context/AuthProvider';
import Footer from './components/footer/footer';

const NO_LAYOUT_ROUTES = ['/login'];

const Layout = () => {
  const location = useLocation();

  if (NO_LAYOUT_ROUTES.includes(location.pathname)) {
    return <Router />;
  }

  return (
    <>
      <CatalogoMobile MenuProps={MenuProps}/>
      <div className="max-w-[990px] max-[1000px]:max-w-[90%] mx-auto relative flex flex-col gap-4">
        <Header />
        <Router />
      </div>
      <Footer />
    </>
  );
};

function App() {
  return (
    <>
        <AuthProvider>
          <FilterActiveProvider>
            <CatalogoPageProvider>
              <CartProvider>
                <BrowserRouter>
                  <Layout />
                </BrowserRouter>
              </CartProvider>
            </CatalogoPageProvider>
          </FilterActiveProvider>
        </AuthProvider>
    </>
  )
}

export default App;