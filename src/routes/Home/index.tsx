import { lazy } from 'react';

const Profile = lazy(() => import('@/pages/Home/Profile'));
const Lesson = lazy(() => import('@/pages/Lesson/Grammar'));
const Speaking = lazy(() => import('@/pages/Module/Speaking'));

const Saved = lazy(() => import('@/pages/Home/Saved'));

const Routes = [
	{
		path: '',
		element: <Speaking />,
	},
	{
		path: '/:id',
		element: <Lesson />,
	},
	{
		path: '/profile',
		element: <Profile />,
	},
	{
		path: '/saved',
		element: <Saved />,
	},
];

export default Routes;
