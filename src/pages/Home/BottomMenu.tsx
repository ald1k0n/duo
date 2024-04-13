import { Layout, Flex, Button, Space, Typography } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/shared/stores/useAuthStore';

export default function BottomMenu() {
	const { user, logout } = useAuthStore();
	const navigate = useNavigate();

	return (
		<Layout className='fixed bottom-0 w-full lg:w-[1140px] mx-auto bg-white'>
			<Flex
				justify='space-between'
				align='center'
				className='h-16'>
				<Link to='/'>
					<Typography
						className='uppercase text-3xl text-[#464547]'
						color='primary'>
						Qazlingo
					</Typography>
				</Link>
				<Space>
					{!user ? (
						<>
							<Button
								size='large'
								type='primary'>
								Login
							</Button>
							<Button
								size='large'
								type='link'>
								Register
							</Button>
						</>
					) : (
						<Button
							onClick={() => {
								logout();
								navigate('/');
							}}
							type='default'>
							Logout
						</Button>
					)}
				</Space>
			</Flex>
			<main className='w-full'>
				<Outlet />
			</main>
		</Layout>
	);
}
