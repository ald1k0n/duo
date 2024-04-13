import { lazy } from 'react';

const Landing = lazy(() => import('@/pages/Home/Landing'));
const Register = lazy(() => import('@/pages/Register'));
const Profile = lazy(() => import('@/pages/Home/Profile'));

const Routes = [
	{
		path: '',
		element: <Landing />,
	},
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '/profile',
		element: <Profile />,
	},
];

export default Routes;
