import { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import Nomatch from './app/Nomatch';
import HomePublic from './app/public/home/Home';
import useAuth from './hooks/useAuth';
import Login from './app/public/login/Login';
import LoginRegisterForm from './app/public/LoginRegisterForm/LoginRegisterForm'; //este es el login  +register que yo hice
import CreatePostForm from './components/private/CreatePostForm/CreatePostForm';
import Home from './app/private/home/Home';

export function App() {
	const { user, isLogged, loginUser, logoutUser } = useAuth();
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
	}

	return (
		<>
			<div className="container floating-toggle" title="Cambiar modo">
				<button
					className="toggle-btn"
					onClick={handleDarkMode}
				>
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
						isLogged ? <Home mode={darkMode} user={user} /> : <Login setLogin={loginUser}/>
					}
				/>
				<Route path="/register" element={<LoginRegisterForm />} />
				<Route path="/recover-password" element={<Nomatch></Nomatch>} />
				<Route path="/home" element={<Home mode={darkMode} user={user} ></Home>}>
					<Route path="me" element={<Nomatch></Nomatch>} />
					<Route path="all" element={<Nomatch></Nomatch>} />
				</Route>
				<Route path="*" element={<Nomatch />} />
			</Routes>
		</>
	);
}

export default App;
