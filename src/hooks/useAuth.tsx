import User from '@/interfaces/User';
import { useEffect, useState } from 'react';
import { setAuthToken } from '@/http/user';

// function useAuth() {
// 	const [user, setUser] = useState<User | null>(null);
// 	const [isLogged, setIsLogged] = useState(false);

// 	const loginUser = async (username: string, user: string) => {
// 		setUser({
// 			name: user,
// 			username: username,
// 		});
// 		setIsLogged(true);
// 	};

// 	const logoutUser = async () => {
// 		setUser(null);
// 		setIsLogged(false);
// 	};

// 	return { user, isLogged, loginUser, logoutUser };
// }

// export default useAuth;

function useAuth() {
	const [user, setUser] = useState<User | null>(null);
	const [isLogged, setIsLogged] = useState(false);


	useEffect(() => {
		const token = localStorage.getItem('token');
		const username = localStorage.getItem('user');

		if (token && username) {
			setUser({ username, name: username });
			setIsLogged(true);
			setAuthToken(token);
		}
	}, []);

	const loginUser = async (username: string, user: string) => {
		localStorage.setItem('token', user);
		localStorage.setItem('user', username);

		setUser({
			username,
			name: username,
		});
		setIsLogged(true);
	};

	const logoutUser = async () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		setUser(null);
		setIsLogged(false);
	};

	return { user, isLogged, loginUser, logoutUser };
}

export default useAuth;
