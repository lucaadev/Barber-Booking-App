import { Route, Routes } from 'react-router-dom';
import './App.css'

import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Login/>} />
        <Route path="/Cadastro" element={<Cadastro/>} />
        <Route path="/Home" element={<Home/>} />
      </Routes>
    </>
  )
}

export default App
