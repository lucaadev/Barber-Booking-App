import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './styles.css';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Agendamentos from './pages/agendamentos';
import Clientes from './pages/clientes';

const App = () => {
  return (
    <>
      <Header />
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="row col-2">
          <Sidebar />
          </div>
          <div className="col-10">
            <Routes>
              <Route path="/" exact element={<Agendamentos />} />
              <Route path="/clientes" element={<Clientes />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
