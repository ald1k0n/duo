import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IUser {
	username: string;
	password: string;
}

interface IStore {
	user: IUser | null;
	isLoading: boolean;
	token: string | null;
	refresh: string | null;
	setUser: (user: IUser, token: string, refresh?: string) => void;
	logout: () => void;
}

export const useAuthStore = create(
	persist<IStore>(
		(set, get) => ({
			isLoading: false,
			user: null,
			token: null,
			refresh: null,
			setUser(user, token, refresh) {
				set({ user, token, refresh });
			},
			logout: () => set({ user: null, token: null }),
		}),
		{
			name: 'user-state',
		}
	)
);
