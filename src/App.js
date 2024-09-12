import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login.js';
import Menu from './components/menu.js';

const App = () => {
  // Verificar si el usuario está autenticado
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  return (
    <Router>
      <Routes>
        {/* Ruta para login */}
        <Route path="/login" element={<Login />} />
        
        {/* Ruta para el menú; redirigir al login si no está autenticado */}
        <Route path="/menu" element={isLoggedIn ? <Menu /> : <Navigate to="/login" />} />
        
        {/* Ruta predeterminada, redirigir al login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;


