import { Layout, Flex, Button, Space, Typography } from 'antd';
import { Link, Outlet } from 'react-router-dom';

export default function Home() {
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
				</Space>
			</Flex>
			<main className='w-full'>
				<Outlet />
			</main>
		</Layout>
	);
}
