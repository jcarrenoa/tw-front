import api from '.';

export async function postUser() {
	const response = await api.get('/tweets');
	return response.data.data;
}