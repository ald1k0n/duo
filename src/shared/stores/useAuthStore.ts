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
	setUser: (user: IUser, token: string) => void;
	logout: () => void;
}

export const useAuthStore = create(
	persist<IStore>(
		(set, get) => ({
			isLoading: false,
			user: null,
			token: null,
			setUser(user, token) {
				set({ user, token });
			},
			logout: () => set({ user: null, token: null }),
		}),
		{
			name: 'user-state',
		}
	)
);
