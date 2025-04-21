import { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import Nomatch from './app/Nomatch';
import Home from './app/private/home/Home';
import HomePublic from './app/public/home/Home';
import useAuth from './hooks/useAuth';
import Login from './app/public/login/Login';

import CreatePostForm from './components/private/CreatePostForm/CreatePostForm';

export function App() {
	const { user, isLogged, loginUser, logoutUser } = useAuth();
	const [darkMode, setDarkMode] = useState(() => {
		return localStorage.getItem('theme') === 'dark';
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

	return (
		<>
			<div className="container floating-toggle" title="Cambiar modo">
				<button
					className="toggle-btn"
					onClick={() => setDarkMode(!darkMode)}
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
						isLogged ? <Home mode={darkMode} /> : <HomePublic />
						//isLogged ? <Home mode={darkMode} /> : <CreatePostForm />
					}
				/>
				<Route path="/login" element={<Login login={loginUser} />} />
				<Route path="/register" element={<Nomatch></Nomatch>} />
				<Route path="/recover-password" element={<Nomatch></Nomatch>} />
				<Route path="/posts" element={<Nomatch></Nomatch>}>
					<Route path="me" element={<Nomatch></Nomatch>} />
					<Route path="all" element={<Nomatch></Nomatch>} />
				</Route>
				<Route path="*" element={<Nomatch />} />
			</Routes>
		</>
	);
}

export default App;
