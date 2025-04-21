import { useState, useEffect } from 'react'
import Public from '@components/public/index'
import LoginForm from '@components/public/LoginForm/LoginForm'
import RegisterForm from '@components/public/RegisterForm/RegisterForm'
import Private from '@components/private/index'
import './App.css'

export function App() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({});
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  
  return (
    <>
    <div className="container floating-toggle" title="Cambiar modo">
      <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <i className="fas fa-sun"></i>: <i className="fas fa-moon"></i> }
      </button>
    </div>
      { login ? 
        <Private mode={darkMode} />
      :
        <RegisterForm />
    }
    </>
  )
}

export default App
