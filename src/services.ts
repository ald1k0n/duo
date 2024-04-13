import axios, {AxiosInstance} from 'axios';
import {
	CreateUserRequest,
	GetUserResponse,
	JwtResponse,
	LoginRequest,
	Module,
	PassModuleParams,
	RefreshRequest,
} from './types';
import api from './shared/api';

import {useAuthStore} from './shared/stores/useAuthStore';

class AuthService {
	private axios: AxiosInstance = api;

	public async login(requestBody: LoginRequest): Promise<JwtResponse> {
		const response = await this.axios.post<JwtResponse>(
			'/auth/login',
			requestBody
		);
		return response.data;
	}

	public async refresh(requestBody: RefreshRequest): Promise<JwtResponse> {
		const response = await this.axios.post<JwtResponse>(
			'/auth/refresh',
			requestBody
		);
		return response.data;
	}
}

class ModuleService {
	private axios: AxiosInstance = api;

	public async createModule(requestBody: Module): Promise<Module> {
		const response = await this.axios.post<Module>('/modules', requestBody);
		return response.data;
	}

	public async getAllModules(): Promise<Module[]> {
		const response = await this.axios.get<Module[]>('/modules');
		return response.data;
	}

	public async passModule(params: PassModuleParams): Promise<Module> {
		const response = await this.axios.get<Module>('/modules/pass', { params });
		return response.data;
	}
}

class UserService {
	private axios: AxiosInstance = api;

	public async createUser(
		requestBody: CreateUserRequest
	): Promise<GetUserResponse> {
		const response = await this.axios.post<GetUserResponse>(
			'/users',
			requestBody
		);
		return response.data;
	}

	public async getCurrentUser(): Promise<GetUserResponse> {
		const response = await this.axios.get<GetUserResponse>('/users/me');
		const data = response.data;

		useAuthStore.getState().setUser({id: data.id, email: data.email, password: ''});

		return data;
	}
}

class AudioService {
	private axios: AxiosInstance = api;

	public async uploadAudio(file: Blob): Promise<string> {
		const formData = new FormData();
		formData.append('file', file);
		const response = await this.axios.post<string>('/audio/upload', formData);
		return response.data;
	}
}

class TtsService {
	private axiosInstance: AxiosInstance;

	constructor() {
		const VOICE_API_URL = import.meta.env.VITE_VOICE_API_URL;
		if (!VOICE_API_URL) {
			throw new Error('VOICE_API_URL is not defined');
		}
		this.axiosInstance = axios.create({
			baseURL: VOICE_API_URL,
		});
	}

	public async textToSpeech(text: string): Promise<Blob> {
		const response = await this.axiosInstance.get<Blob>('/text2speech', {
			params: { text },
			responseType: 'blob',
		});
		return response.data;
	}
}

export { AuthService, ModuleService, UserService, AudioService, TtsService };
