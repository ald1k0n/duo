import { Disc } from '@/components';
import { ModuleService } from '@/services';
import { Flex, Layout, notification } from 'antd';
import { useEffect, useState } from 'react';

export default function Grammar() {
	const service = new ModuleService();
	const [lessons, setLessons] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const data = await service.getAllModules();
				// setData(data[1].lessons);
				setLessons(data[1] as any[]);
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
				notification.error({
					message: 'Error Happened',
					duration: 5,
					placement: 'topRight',
				});
			}
		})();
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	return (
		<Layout
			className='mt-4'
			style={{
				backgroundColor: '#A3C644',
			}}>
			<div className='w-full md:w-[400px] mx-auto px-3 mt-2'>
				{lessons.map((_, index) => (
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
