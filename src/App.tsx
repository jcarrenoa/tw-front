import { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import Nomatch from './app/Nomatch';
import useAuth from './hooks/useAuth';
import Home from './app/private/home/Home';
import Comments from './app/private/Comments/Comments';
import Register from './app/public/register/Register';
import Login from './app/public/login/Login';

export function App() {
  const { user, isLogged, loginUser, logoutUser, isLoading } = useAuth();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'light';
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <div className="container floating-toggle" title="Cambiar modo">
        <button className="toggle-btn" onClick={handleDarkMode}>
          {darkMode ? (
            <i className="fas fa-sun"></i>
          ) : (
            <i className="fas fa-moon"></i>
          )}
        </button>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            isLogged ? (
              <Home mode={darkMode} user={user} isLoading={isLoading}></Home>
            ) : (
              <Login setLogin={loginUser} />
            )
          }
        />
        <Route path="/signup" element={<Register />} />
        <Route path="/recover-password" element={<Nomatch></Nomatch>} />
        <Route path="/comments/:id" element={<Comments/>} />
        <Route path="*" element={<Nomatch />} />
      </Routes>
    </>
  );
}

export default App;
