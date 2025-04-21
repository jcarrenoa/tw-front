import { login, setAuthToken } from '@/http/user';
import User from '@/interfaces/User';
import React, { useState } from 'react';

function useAuth() {
	const [user, setUser] = useState<User | null>(null);
	const [isLogged, setIsLogged] = useState(false);

	const loginUser = async (username: string, password: string) => {
		let response;
		try {
			response = await login(username, password);
		} catch (e) {
			// Error message
			return;
		}

		setAuthToken(response.data.token);
		setUser({
			name: response.data.name,
			username: response.data.username,
		});
		setIsLogged(true);
	};

	const logoutUser = async () => {
		setUser(null);
		setIsLogged(false);
	};

	return { user, isLogged, loginUser, logoutUser };
}

export default useAuth;
