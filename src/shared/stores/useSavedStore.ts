import { persist } from 'zustand/middleware';
import { create } from 'zustand';

interface IStore {
	saved: any[];
	addToSave: (task: any) => void;
	removeFromSave: (idx: number) => void;
}

export const useSavedStore = create(
	persist<IStore>(
		(set, get) => ({
			saved: [],
			addToSave(task) {
				const prev = get().saved;
				// console.log(prev);
				prev.push(task);
				set({ saved: prev });
			},
			removeFromSave(idx) {
				const prev = [...get().saved];
				prev.splice(idx, 1);
				set({ saved: prev });
			},
		}),

		{
			name: 'saved-store',
		}
	)
);
