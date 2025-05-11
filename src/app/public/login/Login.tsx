import React from 'react';
import LRFCSS from './Login.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

interface Props {
  setLogin: (username: string, password: string) => Promise<any>;
}

export function Login({ setLogin }: Props) {
  const [loginUser, setLoginUser] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (loginUser === '' || loginPassword === '') {
      alert('Por favor, completa todos los campos');
      return;
    }
    try {
      const response = await setLogin(loginUser, loginPassword);
      if (response.message === 'ok') {
        navigate('/');
      }
      if (response.status === 500) {
        alert('Error en el servidor');
      }
    } catch (error) {
      alert('Error en el servidor');
    }
  };

  return (
    <div className={LRFCSS['contenedor']}>
      <form
        className={LRFCSS['form']}
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <h2>Iniciar sesión</h2>
        <input
          className={LRFCSS['input']}
          type="text"
          placeholder="Nombre de usuario"
          value={loginUser}
          onChange={(e) => setLoginUser(e.target.value)}
        />
        <input
          className={LRFCSS['input']}
          type="password"
          placeholder="Contraseña"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <div className={LRFCSS['btn-container']}>
          <button className={LRFCSS['btn']} type="submit">
            Iniciar sesión
          </button>
          <Link className={LRFCSS['no-register']} to="/signup">
            ¿No tienes cuenta?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
