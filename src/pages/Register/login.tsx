import { Flex, Layout, Typography } from 'antd';

export default function Login() {
	return (
		<Layout
			className='bg-white'
			style={{
				height: 'calc(100vh - 80px)',
			}}>
			<Flex
				className='bg-white'
				justify='center'>
				<Typography.Title level={3}>I want to learn...</Typography.Title>
			</Flex>
		</Layout>
	);
}
