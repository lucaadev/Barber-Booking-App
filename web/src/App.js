import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './styles.css';

import Header from './components/Header';
import Agendamentos from './pages/agendamentos';
import Clientes from './pages/clientes';
import Colaboradores from './pages/colaboradores';
import Servicos from './pages/servicos';
import Horarios from './pages/horarios';

const App = () => {
  return (
    <>
      <Header />
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="">
            <Routes>
              <Route path="/" exact element={<Agendamentos />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/colaboradores" element={<Colaboradores />} />
              <Route path="/servicos" element={<Servicos />} />
              <Route path="/horarios" element={<Horarios />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
