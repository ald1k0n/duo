import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IUser {
	id?: string;
	email: string;
	password: string;
}

interface IStore {
	user: IUser | null;
	isLoading: boolean;
	token: string | null;
	refresh: string | null;
	setTokens: (token: string, refresh?: string) => void;
	updateToken: (refresh: string) => void;
	setUser: (user: IUser) => void;
	logout: () => void;
}

export const useAuthStore = create(
	persist<IStore>(
		(set, get) => ({
			isLoading: false,
			user: null,
			token: null,
			refresh: null,
			setUser(user) {
				set({ user });
			},
			setTokens(token, refresh) {
				set({ token, refresh });
			},
			updateToken(token) {
				set({ token });
			},
			logout: () => set({ user: null, token: null, refresh: null }),
		}),
		{
			name: 'user-state',
		}
	)
);
