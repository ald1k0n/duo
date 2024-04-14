import { lazy } from 'react';

const Landing = lazy(() => import('@/pages/Home/Landing'));
const Profile = lazy(() => import('@/pages/Home/Profile'));

const Speaking = lazy(() => import('@/pages/Module/Speaking'));

const Routes = [
	{
		path: '',
		element: <Landing />,
	},
	{
		path: '/register',
		element: <Speaking />,
	},
	{
		path: '/profile',
		element: <Profile />,
	},
];

export default Routes;
