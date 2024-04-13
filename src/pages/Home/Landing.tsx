import { Button, Flex, Typography } from 'antd';
import Oyu from '/assets/oyuo.png';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
	const navigate = useNavigate();
	return (
		<Flex
			justify='space-around'
			className='w-3/4 mx-auto font-roboto'
			gap={8}
			align='center'
			style={{
				height: 'calc(100vh - 64px)',
			}}>
			<div className='flex flex-1'>
				<img
					className='h-full w-full'
					src={Oyu}
					alt='Logo'
				/>
			</div>
			<div className='flex flex-1 flex-col'>
				<Typography className='text-3xl text-center'>
					The free, fun, and effective way to learn a language!
				</Typography>
				<Flex
					vertical
					gap={8}
					className='w-2/3 mx-auto mt-4'>
					<Button
						onClick={() => navigate('/register')}
						size='large'
						type='primary'>
						Get Started
					</Button>
					<Button size='large'>I already have an account</Button>
				</Flex>
			</div>
		</Flex>
	);
};
export default Landing;
