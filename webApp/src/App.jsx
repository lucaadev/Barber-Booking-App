import { Route, Routes } from 'react-router-dom';
import './App.css'

import Login from './pages/Login'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Login/>} />
        <Route path="/Cadastro" element={<h1>Cadastro</h1>} />
        <Route path="/Home" element={<h1>Home</h1>} />
      </Routes>
    </>
  )
}

export default App
