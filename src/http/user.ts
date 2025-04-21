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

export async function allUsers() {
	const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODA1OWNhODliOGY1MjgxMTA5ZmRmZTYiLCJpYXQiOjE3NDUxOTgyNzB9.Bn4j57LfpLKhVIkwqetf1HKvNs7T0GjCFxmGlI8Uchs'
	localStorage.setItem('authToken', token);
	api.defaults.headers.common['x-access-token'] = token;
	const response = await api.get('/users/');
	return response.data.data;
}