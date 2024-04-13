import { Disc } from '@/components';
import { ModuleService } from '@/services';
import { useAuthStore } from '@/shared/stores/useAuthStore';
import { useModulesStore } from '@/shared/stores/useModulesStore';
import { Flex, Layout, notification, Typography } from 'antd';
import {useEffect, useMemo, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Lesson} from "@/types.ts";

export default function Grammar() {
	const service = useMemo(() => new ModuleService(), []);
	const [lessons, setLessons] = useState<Lesson[]>([]);
	const [moduleData, setModuleData] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(true);
	const { setCurrentLesson } = useModulesStore();
	const { user } = useAuthStore();
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				const data = await service.getAllModules();
				const lessonData = data?.find((d) => d.title === 'Grammar Module');

				setModuleData(() => ({ moduleId: lessonData?.id }));
				if (lessonData) {
					setLessons(lessonData?.lessons);
				}
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
	}, [service]);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	return (
		<Layout
			className='mt-4'
			style={{
				backgroundColor: '#A3C644',
				height: 'calc(100vh - 80px)', // Changed from minHeight to height as per design-fix branch
			}}>
			<div>
				<Typography.Title
					className='text-center'
					level={3}
					style={{
						color: 'white',
					}}>
					Grammar Module
				</Typography.Title>
			</div>
			<div className='w-full md:w-[400px] mx-auto px-3 mt-2'>
				{lessons?.map((lesson, index) => (
					<Flex
						key={index}
						wrap='wrap'
						onClick={() => {
							setCurrentLesson(lesson);
							navigate(`./${lesson.title}`, {
								state: {
									moduleData,
									lessonIdx: index,
								},
							});
						}}
						justify={'center'}
						gap={16}
						style={{ marginBottom: 16 }}>
						<div
							style={{
								transform: `translateX(${calculateTransitionPx(index)}px)`,
							}}>
							<Disc
								title={lesson.title}
								isDone={!!user && !!user.id && lesson.passedStudentIds.includes(user.id)}
							/>
						</div>
					</Flex>
				))}
			</div>
		</Layout>
	);
}

function calculateTransitionPx(index: number) {
	const radius = 100;
	return radius * Math.sin((index * Math.PI) / 3.2);
}
