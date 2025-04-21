import User from '@/interfaces/User';
import { useState } from 'react';

function useAuth() {
	const [user, setUser] = useState<User | null>(null);
	const [isLogged, setIsLogged] = useState(false);

	const loginUser = async (username: string, user: string) => {
		setUser({
			name: user,
			username: username,
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
