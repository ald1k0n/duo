import { Layout, Collapse, Typography, Flex } from 'antd';

import { useSavedStore } from '@/shared/stores/useSavedStore';

export default function Saved() {
	const { saved } = useSavedStore();

	console.log(saved);

	return (
		<Layout
			style={{
				backgroundColor: '#A3C644',
				minHeight: 'calc(100vh - 48px)',
				color: 'white',
			}}>
			<Typography.Title
				level={4}
				className='text-center'
				style={{ color: 'white' }}>
				Saved
			</Typography.Title>
			<Flex vertical>
				<Collapse
					style={{
						backgroundColor: 'white',
					}}
					items={saved.map((save, idx) => ({
						label: save?.question,
						key: idx,
						children: save?.answer,
					}))}
				/>
			</Flex>
		</Layout>
	);
}
