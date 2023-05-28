import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Alert, AlertTitle } from '@mui/material';
import Tickets from '../img/10.png'

function Login() {
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [alert, setAlert] = useState(null);

  const submitHandler = e => {
    e.preventDefault();
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email === '' || password === '') {
      setAlert('Faltan Datos');
      return;
    }
    if (email !== '' && !regexEmail.test(email)) {
      setAlert('Formato de email inválido');
      return;
    }
    if (email !== 'ignacio@alura.org' || password !== 'react') {
      setAlert('Credenciales inválidas');
      return;
    }
    if (email === 'ignacio@alura.org' && password === 'react') {
      sessionStorage.setItem('user', email);
      const token = 131313;
      sessionStorage.setItem('token', token);
      setToken(token); // Actualizar el estado del token
    }
  };

  return (
    <>
      {!token ? <Navigate to="/login" /> : <Navigate to="/listado" />}

      {alert && (
        <Alert severity="error">
          <AlertTitle>{alert}</AlertTitle>
          {alert === 'Faltan Datos' && 'Por favor complete los datos.'}
          {alert === 'Formato de email inválido' &&
            'Formato de email inválido, ejemplo@email.com.'}
          {alert === 'Credenciales inválidas' &&
            'Por favor verifique que el email o la contraseña sean incorrectos.'}
        </Alert>
      )}
      <div className='login'>
        <div>
          <h2>Formulario de Ingreso</h2>
          <form onSubmit={submitHandler}>
            <label>
              <span>Correo electrónico = ignacio@alura.org </span>
              <br />
              <input type="text" name="email" />
            </label>
            <br />
            <label>
              <span>Contraseña = react</span>
              <br />
              <input type="password" name="password" />
            </label>
            <br />
            <button
              style={{ marginTop: '10px', marginBottom: '5px' }}
              type="submit"
              className="btn btn-dark"
            >
              Ingresar
            </button>
          </form>
          </div>
        <img src={Tickets} alt='...'/>
      </div>
      
    </>
  );
}

export default Login;
