import { Disc } from '@/components';
import { Flex, Layout } from 'antd';

export default function Grammar() {
	return (
		<Layout className='bg-white mt-4'>
			<div className='w-full md:w-[400px] mx-auto px-3'>
				{new Array(18).fill(0).map((_, index) => (
					<Flex
						key={index}
						wrap='wrap'
						justify={index === 0 ? 'center' : index % 2 === 1 ? 'end' : 'start'}
						gap={16}
						style={{ marginBottom: 16 }}>
						<Disc title='popa' />
					</Flex>
				))}
			</div>
		</Layout>
	);
}
