import { Layout, Flex, Button, Space, Typography } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
	HomeOutlined,
	UserOutlined,
	UnorderedListOutlined,
} from '@ant-design/icons';

import { useAuthStore } from '@/shared/stores/useAuthStore';

export default function Home() {
	const { user, logout } = useAuthStore();
	const navigate = useNavigate();

	return (
		<Layout className='min-h-screen w-full lg:w-[1140px] mx-auto bg-white'>
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

			<Flex
				justify='space-evenly'
				align='center'
				className='fixed bottom-0 w-full bg-white border-t border-gray-200 h-20 rounded-full left-0'
				style={{ backgroundColor: '#39C2D7', border: 'none' }}>
				<Link to='/profile'>
					<Button type='text'>
						<img
							src='/assets/profile.svg'
							alt='profile'
						/>
					</Button>
				</Link>

				<div
					className='rounded-full w-24 h-24 flex justify-center items-center'
					style={{
						backgroundColor: '#A3C644',
						transform: 'translateY(-3rem)',
					}}>
					<div
						className='rounded-full w-20 h-20 flex justify-center items-center'
						style={{
							backgroundColor: '#39C2D7',
						}}>
						<Link to='/'>
							<img
								src='/assets/yurt.svg'
								alt='yurt'
							/>
						</Link>
					</div>
				</div>

				<Link to='/'>
					<Button type='text'>
						<img
							src='/assets/profile.svg'
							alt='profile'
						/>
					</Button>
				</Link>
			</Flex>
		</Layout>
	);
}
