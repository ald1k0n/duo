import { Button, Flex, Layout, Space, Typography } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { RetweetOutlined } from '@ant-design/icons';

import { SignIn } from '@/components/Auth/SignIn';
import { useAuthStore } from '@/shared/stores/useAuthStore';
import { useState } from 'react';

export default function Home() {
	const [open, setOpen] = useState(false);
	const { user, logout } = useAuthStore();
	const navigate = useNavigate();

	return (
		<Layout className='min-h-screen w-full lg:w-[1140px] mx-auto bg-[#39C2D7]'>
			<Flex
				justify='space-between'
				align='center'
				className='h-16 px-3'>
				<Link to='/'>
					<Typography
						className='uppercase text-3xl text-[#464547]'
						color='primary'>
						Qazlingo
					</Typography>
				</Link>
				<Space>
					{user && (
						<Button
							onClick={() => {
								logout();
								navigate('/');
							}}
							type='default'>
							Шығу
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
				className='fixed bottom-0 w-full bg-white border-t border-gray-200 h-20 rounded-t-[3rem] left-0'
				style={{ backgroundColor: '#39C2D7', border: 'none' }}>
				<Link to='/profile'>
					<Button type='link'>
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
						<Link
							type='link'
							to='/'>
							<img
								src='/assets/yurt.svg'
								alt='yurt'
							/>
						</Link>
					</div>
				</div>

				<Link
					className='w-16'
					to='/saved'>
					<Button
						type='link'
						icon={
							<RetweetOutlined
								style={{
									fontSize: 32,
									color: 'white',
								}}
							/>
						}
					/>
				</Link>
			</Flex>
			{open && (
				<SignIn
					open={open}
					setOpen={setOpen}
				/>
			)}
		</Layout>
	);
}
