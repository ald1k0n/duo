import { CheckOutlined, FireOutlined } from '@ant-design/icons';
import {
	Avatar,
	Button,
	Card,
	Flex,
	Form,
	Input,
	Layout,
	notification,
	Typography,
} from 'antd';

import { useAuthStore } from '@/shared/stores/useAuthStore';
import { useState } from 'react';
import { AuthService, UserService } from '@/services';
import { LoginRequest } from '@/types';

export default function Profile() {
	const { user, setTokens } = useAuthStore();

	const [form] = Form.useForm();

	const [isSignUp, setIsSignUp] = useState(false);
	const userService = new UserService();
	const authService = new AuthService();

	const handleFinish = async (payload: LoginRequest) => {
		try {
			if (isSignUp) {
				await userService['createUser'](payload);
				form.resetFields();
				setIsSignUp(false);
				notification.success({
					message: 'Success',
					duration: 5,
					placement: 'topRight',
				});
			} else {
				const data = await authService.login(payload);
				setTokens(data.accessToken, data.refreshToken);
			}
		} catch (error) {
			notification.error({
				message: 'Error happened',
				duration: 5,
				placement: 'topRight',
			});
		}
	};

	return (
		<Layout
			className=''
			style={{
				height: '100vh',
				backgroundColor: '#A3C644',
			}}>
			<Card className='m-6'>
				{user ? (
					<>
						<Typography.Title
							level={3}
							style={{ fontWeight: 'bold' }}>
							ПРОФИЛЬ
						</Typography.Title>
						<div className='grid grid-cols-6 mb-4'>
							<Avatar
								size={80}
								src='https://i.pravatar.cc/300'
								className='col-span-2'
							/>
							<div className='col-span-4'>
								<Typography.Title
									level={4}
									style={{ fontWeight: 'bold' }}>
									{user.email.split('@')[0]}
								</Typography.Title>
								<Typography.Text>
									Сіз тоқтаусыз 1 күн оқып жүрсіз. Барлығы 2 күн.
								</Typography.Text>
							</div>
						</div>
						<div className='grid grid-cols-3 gap-4'>
							<Button
								icon={<FireOutlined />}
								className='border-2'
								style={{ borderColor: '#39C2D7', color: '#39C2D7' }}>
								1
							</Button>
							<Button
								icon={<CheckOutlined />}
								className='border-2'
								style={{ borderColor: '#39C2D7', color: '#39C2D7' }}>
								2
							</Button>
							<Button
								type='primary'
								className='border-2'
								style={{ borderColor: '#39C2D7', backgroundColor: '#39C2D7' }}>
								PLUS
							</Button>
						</div>
					</>
				) : (
					<>
						<Flex vertical>
							<Typography.Title
								className='text-center'
								level={3}>
								{isSignUp ? 'Register' : 'Login'}
							</Typography.Title>
						</Flex>
						<Form
							className='w-full mx-auto'
							layout='vertical'
							onFinish={handleFinish}
							form={form}>
							<Form.Item
								label='Email'
								name='email'>
								<Input
									className='w-full'
									size='large'
									placeholder='email@gmail.com'
									type='email'
								/>
							</Form.Item>
							<Form.Item
								label='Password'
								name='password'>
								<Input
									className='w-full'
									size='large'
									placeholder='********'
									type='password'
								/>
							</Form.Item>
							<Button
								className='w-full'
								htmlType='submit'>
								{isSignUp ? 'Register' : 'Login'}
							</Button>
							<Button
								className='w-full'
								type='link'
								onClick={() => setIsSignUp((prev) => !prev)}
								htmlType='button'>
								{!isSignUp
									? "Don't have an account"
									: 'Already have an account'}
							</Button>
						</Form>
					</>
				)}
			</Card>
		</Layout>
	);
}
