import { AuthService, UserService } from '@/services';
import { useAuthStore } from '@/shared/stores/useAuthStore';
import { LoginRequest } from '@/types';
import { useNavigate } from 'react-router-dom';
import {
	Button,
	Flex,
	Form,
	Input,
	Layout,
	Modal,
	notification,
	Space,
	Typography,
} from 'antd';
import { Dispatch, SetStateAction, FC, useState } from 'react';

interface IProps {
	setOpen: Dispatch<SetStateAction<boolean>>;
	open: boolean;
}

export const SignIn: FC<IProps> = ({ open, setOpen }) => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const { setTokens } = useAuthStore();

	const [isSignUp, setIsSignUp] = useState(false);
	const user = new UserService();
	const auth = new AuthService();
	const handleFinish = async (payload: LoginRequest) => {
		try {
			if (isSignUp) {
				await user['createUser'](payload);
				form.resetFields();
				setIsSignUp(false);
				notification.success({
					message: 'Сіз сәтті тіркелдіңіз',
					duration: 5,
					placement: 'topRight',
				});
			} else {
				const data = await auth.login(payload);
				setTokens(data.accessToken, data.refreshToken);
				setOpen(false);
				navigate('/register');
			}
		} catch (error) {
			notification.error({
				message: 'Қате орын алды',
				duration: 5,
				placement: 'topRight',
			});
		}
	};

	return (
		<Modal
			footer={null}
			centered
			width={'100%'}
			styles={{
				body: {
					height: 'calc(100vh - 96px)',
				},
			}}
			closeIcon={null}
			open={open}>
			<Flex
				vertical
				style={{
					width: '100%',
					height: '100%',
				}}
				justify='around'>
				<Flex justify='end'>
					<Button
						onClick={() => setIsSignUp(true)}
						type='default'>
						Тіркелу
					</Button>
				</Flex>
				<Layout className='bg-white'>
					<Flex vertical>
						<Typography.Title
							className='text-center'
							level={3}>
							{isSignUp ? 'Тіркелу' : 'Кіру'}
						</Typography.Title>
					</Flex>
					<Form
						className='w-full mx-auto'
						layout='vertical'
						onFinish={handleFinish}
						form={form}>
						<Form.Item
							label='Электрондық пошта'
							name='email'>
							<Input
								size='large'
								placeholder='email@gmail.com'
								type='email'
							/>
						</Form.Item>
						<Form.Item
							label='Құпия сөз'
							name='password'>
							<Input
								size='large'
								placeholder='********'
								type='password'
							/>
						</Form.Item>
						<Button
							className='w-full'
							htmlType='submit'>
							{isSignUp ? 'Тіркелу' : 'Кіру'}
						</Button>
					</Form>
				</Layout>
				<Space className='flex justify-center'>
					<Button
						type='link'
						onClick={() => setOpen(false)}>
						<div className='w-96'>Бас тарту</div>
					</Button>
				</Space>
			</Flex>
		</Modal>
	);
};
