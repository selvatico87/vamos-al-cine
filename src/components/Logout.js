import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    // También puedes limpiar otros datos de sesión si es necesario
    // Redirige al usuario a la página de inicio de sesión
    navigate('/login');
  };

  return (
    <Button onClick={handleLogout} variant="contained" color="secondary">
      Cerrar sesión
    </Button>
  );
};

export default Logout;
