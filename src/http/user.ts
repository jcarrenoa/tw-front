import api from '.';

export function setAuthToken(token: string) {
	localStorage.setItem('token', token);
	api.defaults.headers.common['x-access-token'] = token;
}

export function cleanAuthToken() {
	localStorage.removeItem('token');
	delete api.defaults.headers.common['x-access-token'];
}

export async function login(username: string, password: string) {
	const response = await api.post('/users/login', { username, password });
	return response.data;
}

export async function allUsers() {
	const response = await api.get('/users/');
	return response.data.data;
}

export async function register(name: string, email: string , username: string, password: string, passwordConfirmation: string) {
	const response = await api.post('/users/', { name, email, username, password, passwordConfirmation });
	return response.data;
}