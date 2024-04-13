import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface IStore {
	getModules: () => Promise<any>;
}

export const useModulesStore = create<IStore>()(
	immer((set) => ({
		async getModules() {},
	}))
);
