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
				console.log(access);
				useAuthStore.getState().updateToken(access);

				const originalRequest = error.config;

				originalRequest.headers[
					'Authorization'
				] = `Bearer ${data?.accessToken}`;

				return api(originalRequest);
			} catch (error : unknown) {
				useAuthStore.getState().logout();
				if (error instanceof Error) {
					throw error;
				} else {
					throw new Error(`An unexpected error occurred: ${String(error)}`);
				}
			}
		}
	}
);
export default api;
