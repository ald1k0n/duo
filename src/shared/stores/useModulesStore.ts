import { Lesson, Module } from '@/types';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface IStore {
	currentLesson: Pick<Lesson, 'questions'> | null;
}

interface IAction {
	setCurrentLesson: (payload: Pick<Lesson, 'questions'> | null) => void;
}

export const useModulesStore = create<IStore & IAction>()(
	immer((set) => ({
		currentLesson: null,
		setCurrentLesson: (payload) => set({ currentLesson: payload }),
	}))
);
