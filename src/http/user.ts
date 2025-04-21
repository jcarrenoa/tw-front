import api from '.';

export function setAuthToken(token: string) {
	localStorage.setItem('authToken', token);
	api.defaults.headers.common['x-access-token'] = token;
}

export function cleanAuthToken() {
	localStorage.removeItem('authToken');
	delete api.defaults.headers.common['x-access-token'];
}

export async function login(username: string, password: string) {
	const response = await api.post('/users/login', { username, password });
	return response.data;
}

export async function allUsers(params:string) {
	const response = await api.get('/users/all');
	return response;
}
