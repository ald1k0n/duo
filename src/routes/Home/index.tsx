import { lazy } from 'react';

const Landing = lazy(() => import('@/pages/Home/Landing'));
const Register = lazy(() => import('@/pages/Register'));

const Routes = [
	{
		path: '',
		element: <Landing />,
	},
	{
		path: '/register',
		element: <Register />,
	},
];

export default Routes;
