import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
      setIsAuthenticated(true);
    } else {
      navigate('/login');  // Redirigir si no está autenticado
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('loggedIn');
    setIsAuthenticated(false);
    navigate('/login');  // Redirigir al login
  };

  return { isAuthenticated, logout };
};

export default useAuth;
