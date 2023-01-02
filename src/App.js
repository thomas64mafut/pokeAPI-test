import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Pokemon from './components/layout/pokemon/Pokemon';
import Header from './components/layout/header/Header';
import ControlLogin from './components/layout/controlLogin/ControlLogin';
import Home from './components/layout/home/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/pokemon' element={<Pokemon />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
