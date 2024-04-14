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
	const [moduleData, setModuleData] = useState<{
		moduleId: string;
	} | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const { setCurrentLesson } = useModulesStore();
	const { user } = useAuthStore();

	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				const data = await service.getAllModules();

				const lessonData = data?.map((d) => {
					const lessonsWithModuleId = d.lessons.map((lesson) => ({
						...lesson,
						moduleId: d.id,
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
			className='mt-4'
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
				Level 1
			</Typography.Title>
			<div className='w-full md:w-[400px] mx-auto px-3 mt-2'>
				{lessons?.map((lesson, index) => (
					<Flex
						key={index}
						wrap='wrap'
						onClick={() => {
							setCurrentLesson(lesson);
							navigate(`./${lesson.title}`, {
								state: {
									moduleData: {
										moduleId: lesson.moduleId,
									},
									lessonIdx: index,
									isAudio: true,
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
