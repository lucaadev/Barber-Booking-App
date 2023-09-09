import { Route, Routes } from 'react-router-dom';
import './App.css'

import Login from './pages/Login';
import Cadastro from './pages/Cadastro';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Login/>} />
        <Route path="/Cadastro" element={<Cadastro/>} />
        <Route path="/Home" element={<h1>Home</h1>} />
      </Routes>
    </>
  )
}

export default App
