import axios from 'axios';

import { useAuthStore } from './stores/useAuthStore';

const api = axios.create({
	baseURL: 'http://25.21.101.93:8000',
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		const status = error?.response?.status;
		if (status === 401) {
			try {
				const token = useAuthStore.getState().refresh;
			} catch (error) {
				useAuthStore.getState().logout();
				return Promise.reject(error);
			}
		}
	}
);
