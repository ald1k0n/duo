import axios from 'axios';

import { useAuthStore } from './stores/useAuthStore';

const api = axios.create({
	baseURL: import.meta.env?.VITE_API_URL,
});

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const status = error?.response?.status;
		if (status === 401) {
			try {
				const token = useAuthStore.getState().refresh;
				const { data } = await api.post('/auth/refresh', {
					refreshToken: token,
				});
				const access = data?.accessToken;
				useAuthStore.getState().updateToken(access);

				const originalRequest = error.config;

				originalRequest.headers[
					'Authorization'
				] = `Bearer ${data?.accessToken}`;

				return api(originalRequest);
			} catch (error) {
				useAuthStore.getState().logout();
				return Promise.reject(error);
			}
		}
	}
);
export default api;
