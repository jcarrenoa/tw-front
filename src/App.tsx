import { useState, useEffect } from 'react'
import Public from '@components/public/index'
import Private from '@components/private/index'
import './App.css'

export function App() {
  const [login, setLogin] = useState(true);
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
    <div className="container">
      <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <i className="fas fa-sun"></i>: <i className="fas fa-moon"></i> }
      </button>
    </div>
      { login ? 
        <Private/>
      :
        <Public />
    }
    </>
  )
}

export default App
