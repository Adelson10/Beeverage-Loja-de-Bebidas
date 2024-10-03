import './App.css';
import Header from './components/header/Header';
import Home from './Pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
        <BrowserRouter>
        <Header />
          <Routes>
            <Route path='/' element={<Home />}/>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App;