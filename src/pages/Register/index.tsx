import { Flex, Layout, Typography } from 'antd';

import { Block } from '@/components';

const Blocks = [
	{
		path: '/module/test',
		title: 'Start',
	},
];

export default function Register() {
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
			<Flex
				className='bg-white'
				justify='center'
				wrap='wrap'
				gap={16}>
				{Blocks.map(({ path, title }, idx: number) => (
					<Block
						path={path}
						key={idx}>
						{title}
					</Block>
				))}
			</Flex>
		</Layout>
	);
}
