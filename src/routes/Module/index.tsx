import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const Grammar = lazy(() => import('@/pages/Module/Grammar'));
const Reading = lazy(() => import('@/pages/Module/Reading'));
const Speaking = lazy(() => import('@/pages/Module/Speaking'));
const GrammarLesson = lazy(() => import('@/pages/Lesson/Grammar'));
const ReadingLesson = lazy(() => import('@/pages/Lesson/Reading'));

const Routes: RouteObject[] = [
	{
		path: '/module/grammar',
		element: <Grammar />,
	},
	{
		path: '/module/grammar/:id',
		element: <GrammarLesson />,
	},
	{
		path: '/module/reading',
		element: <Reading />,
	},
	{
		path: '/module/reading/:id',
		element: <ReadingLesson />,
	},
	{
		path: '/module/speaking',
		element: <Speaking />,
	},
];

export default Routes;
