import { Flex, Form, Layout, Modal, Typography } from 'antd';
import { Dispatch, SetStateAction, FC } from 'react';

interface IProps {
	setOpen: Dispatch<SetStateAction<boolean>>;
	open: boolean;
}

export const SignIn: FC<IProps> = ({ open, setOpen }) => {
	const [form] = Form.useForm();

	return (
		<Modal
			centered
			width={'100%'}
			styles={{
				body: {
					height: 'calc(100vh - 96px)',
				},
			}}
			closeIcon={null}
			open={open}
			onCancel={() => setOpen(false)}>
			<Layout className='bg-white'>
				<Flex vertical>
					<Typography.Title
						className='text-center'
						level={3}>
						Login
					</Typography.Title>
				</Flex>
				<Form
					layout='vertical'
					form={form}></Form>
			</Layout>
		</Modal>
	);
};
