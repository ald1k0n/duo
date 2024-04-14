import { Disc } from '@/components';
import { ModuleService } from '@/services';
import { useAuthStore } from '@/shared/stores/useAuthStore';
import { useModulesStore } from '@/shared/stores/useModulesStore';
import {
	Button,
	Card,
	Flex,
	Layout,
	notification,
	Popover,
	Typography,
} from 'antd';
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
						title: d.title,
						name: lesson.title,
					}));
					return lessonsWithModuleId;
				});
				console.log(lessonData);
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
				1-ші деңгей
			</Typography.Title>
			<div className='w-full md:w-[400px] mx-auto px-3 mt-2'>
				{lessons?.map((lesson, index) => (
					<>
						<Flex
							key={index}
							wrap='wrap'
							justify={'center'}
							gap={16}
							style={{ marginBottom: 16 }}>
							<div
								style={{
									transform:
										(index + 1) % 3 !== 0
											? `translateX(${calculateTransitionPx(index)}px)`
											: 'translateX(0)',
									width: (index + 1) % 3 === 0 ? '100%' : 'auto',
								}}>
								<Popover
									placement='bottom'
									title={lesson?.name}
									overlayInnerStyle={{
										backgroundColor: '#39C2D7',
									}}
									content={
										<div>
											<Button
												onClick={() => {
													if (!user) {
														notification.info({
															message:
																'You must be authorized to start the lessson',
															duration: 5,
															placement: 'topRight',
														});
													} else {
														setCurrentLesson(lesson);
														navigate(`./${lesson?.name}`, {
															state: {
																moduleData: {
																	moduleId: lesson.moduleId,
																},
																lessonIdx: lesson.idx,
																isAudio: true,
															},
														});
													}
												}}>
												Бастау!
											</Button>
										</div>
									}
									trigger='click'>
									<Button
										type='link'
										style={{ position: 'absolute' }}></Button>
									<Disc
										title={lesson.name}
										isDone={
											!!user &&
											!!user.id &&
											lesson.passedStudentIds?.includes(user.id)
										}
									/>
								</Popover>
								{(index + 1) % 3 === 0 && (
									<Card
										style={{
											width: '100%',
											color: 'white',
											fontWeight: 700,
											fontSize: 16,
											border: 'none',
										}}
										styles={{
											body: {
												backgroundColor: '#39C2D7',
												width: '100%',
												border: 'none',
											},
										}}>
										{lesson.title}
									</Card>
								)}
							</div>
						</Flex>
						{lessons.length - 1 === index && (
							<>
								<div className='w-full p-4 border-2 border-white rounded-xl text-white text-center my-5'>
									<Typography.Title
										level={2}
										style={{
											color: 'white',
										}}>
										Келесі деңгей
									</Typography.Title>
									<Typography.Text
										style={{
											color: 'white',
											fontSize: 18,
										}}>
										Қазақ тілінде оңай темалар бойынша сөйлесуге үйреніңіз!{' '}
									</Typography.Text>
									<br />
									<Button
										size='large'
										className='mt-4 cursor-not-allowed'
										style={{
											backgroundColor: '#8E244D',
											color: 'white',
										}}
										disabled>
										Өту
									</Button>
								</div>
							</>
						)}
					</>
				))}
			</div>
		</Layout>
	);
}

function calculateTransitionPx(index: number) {
	const radius = 100;
	return radius * Math.sin((index * Math.PI) / 3.2);
}
