import { AxiosInstance } from 'axios';
import { LoginRequest, JwtResponse, RefreshRequest, CreateUserRequest, GetUserResponse, Module, PassModuleParams } from './types';

class AuthService {
    private axios: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        this.axios = axiosInstance;
    }

    public async login(requestBody: LoginRequest): Promise<JwtResponse> {
        const response = await this.axios.post<JwtResponse>('/auth/login', requestBody);
        return response.data;
    }

    public async refresh(requestBody: RefreshRequest): Promise<JwtResponse> {
        const response = await this.axios.post<JwtResponse>('/auth/refresh', requestBody);
        return response.data;
    }
}

class ModuleService {
    private axios: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        this.axios = axiosInstance;
    }

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
    private axios: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        this.axios = axiosInstance;
    }

    public async createUser(requestBody: CreateUserRequest): Promise<GetUserResponse> {
        const response = await this.axios.post<GetUserResponse>('/users', requestBody);
        return response.data;
    }

    public async getCurrentUser(): Promise<GetUserResponse> {
        const response = await this.axios.get<GetUserResponse>('/users/me');
        return response.data;
    }
}

export { AuthService, ModuleService, UserService };