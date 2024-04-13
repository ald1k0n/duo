import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Routes from './Home';
import ModuleRoutes from './Module';
import Test from '@/pages/Test';

const Home = lazy(() => import('@/pages/Home'));

const routes = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
		children: [...Routes, ...ModuleRoutes],
	},
	{
		path: '/test',
		element: <Test />,
	},
]);

export default function RootRout() {
	return (
		<Suspense fallback={<div>Loading....</div>}>
			<RouterProvider router={routes} />
		</Suspense>
	);
}
