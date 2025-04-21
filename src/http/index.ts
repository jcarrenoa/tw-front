import axios from 'axios';

const api = axios.create({
	baseURL: 'https://localhost:8083/api/',
	timeout: 1000,
});

export default api;
