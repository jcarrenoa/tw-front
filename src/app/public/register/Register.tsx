import { useState } from 'react';
import LRFCSS from './Register.module.css';
import { Link } from 'react-router';

const Register = () => {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registrando con', registerEmail, registerPassword);
  };

  const handleLogin = () => {
    if (registerPassword !== registerConfirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    if (registerEmail === '' || registerPassword === '') {
      alert('Por favor, completa todos los campos');
      return;
    }
    if (registerName === '' || registerUsername === '') {
      alert('Por favor, completa todos los campos');
      return;
    }

  };

  return (
    <div className={LRFCSS["contenedor"]}>
      <form className={LRFCSS['form']} onSubmit={handleRegister}>
      <h2>Registrarse</h2>
      <input
        className={LRFCSS['input']}
        type="text"
        placeholder="Nombre y apellido"
        onChange={(e) => setRegisterName(e.target.value)}
      />
      <input
        className={LRFCSS['input']}
        type="text"
        placeholder="Nombre de usuario"
        onChange={(e) => setRegisterUsername(e.target.value)}
      />
      <input
        className={LRFCSS['input']}
        type="email"
        placeholder="Correo electrónico"
        onChange={(e) => setRegisterEmail(e.target.value)}
      />
      <input
        className={LRFCSS['input']}
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setRegisterPassword(e.target.value)}
      />
      <input
        className={LRFCSS['input']}
        type="password"
        placeholder="Confirmar contraseña"
        onChange={(e) => setRegisterConfirmPassword(e.target.value)}
      />
      <div className={LRFCSS['btn-container']}>
        <button className={LRFCSS['btn']} type="submit" onClick={handleLogin}>Registrarse</button>
	      <Link className={LRFCSS['no-register']} to="/">Ya tengo cuenta</Link>
	    </div>
      </form>
    </div>
  );
};

export default Register;

