import { Disc } from '@/components';
import { ModuleService } from '@/services';
import { useAuthStore } from '@/shared/stores/useAuthStore';
import { useModulesStore } from '@/shared/stores/useModulesStore';
import { Flex, Layout, notification, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lesson } from '@/types.ts';

export default function Speaking() {
	const service = new ModuleService();
	const [lessons, setLessons] = useState<Lesson[]>([]);

	const [isLoading, setIsLoading] = useState(true);
	const { setCurrentLesson } = useModulesStore();
	const { user } = useAuthStore();

	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				const data = await service.getAllModules();

				const lessonData = data?.map((d) => {
					const lessonsWithModuleId = d.lessons.map((lesson, idx) => ({
						...lesson,
						moduleId: d.id,
						idx,
					}));
					return lessonsWithModuleId;
				});

				if (lessonData) {
					setLessons(lessonData.flat());
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
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	return (
		<Layout
			className='pt-4'
			style={{
				backgroundColor: '#A3C644',
				minHeight: 'calc(100vh + 30vh)',
			}}>
			<Typography.Title
				className='text-center'
				level={3}
				style={{
					color: 'white',
				}}>
				1-ші деңгей
			</Typography.Title>
			<div className='w-full md:w-[400px] mx-auto px-3 mt-2'>
				{lessons?.map((lesson, index) => (
					<Flex
						key={index}
						wrap='wrap'
						onClick={() => {
							if (!user) {
								notification.info({
									message: 'You must be authorized to start the lessson',
									duration: 5,
									placement: 'topRight',
								});
							} else {
								setCurrentLesson(lesson);
								navigate(`./${lesson.title}`, {
									state: {
										moduleData: {
											moduleId: lesson.moduleId,
										},
										lessonIdx: lesson.idx,
										isAudio: true,
									},
								});
							}
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
								isDone={
									!!user &&
									!!user.id &&
									lesson.passedStudentIds?.includes(user.id)
								}
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
