import { Button, Flex, Layout, notification, Space, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { Progress } from 'antd';
import { useModulesStore } from '@/shared/stores/useModulesStore';
import { CloseOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

import { QuestionType } from '@/types';

const answers: Record<QuestionType, Function> = {
	MATCH: (answer: string) => answer.split(' '),
	MCQ: (answer: any) => answer,
	READING: (answer: any) => answer,
};

export default function Lesson() {
	const { id } = useParams();
	const { currentLesson } = useModulesStore();
	const [currentQuestion, setCurrentQuestion] = useState(0);

	const [answerArray, setAnswerArray] = useState<string[]>([]);

	const navigate = useNavigate();

	useEffect(() => {
		if (!currentLesson) {
			navigate(-1);
		}
	}, [currentLesson]);

	const QuestionComponent: Record<QuestionType, Function> = {
		MATCH: (currentLesson: any, currentQuestion: number) => {
			return (
				<div className='w-full px-3 py-4 flex flex-wrap gap-3'>
					{
						//@ts-ignore
						answers?.[currentLesson?.questions?.[currentQuestion]?.type!](
							currentLesson?.questions?.[currentQuestion]?.answer
						)?.map((text: string) => (
							<Button
								disabled={answerArray.includes(text)}
								onClick={() => setAnswerArray((prev) => [...prev, text])}
								className='border-white !hover:bg-white !hover:text-[#A3C644] flex-1'
								size='large'
								key={text}
								type='text'>
								<span className='text-white'>{text}</span>
							</Button>
						))
					}
				</div>
			);
		},
		MCQ: () => {
			const options = currentLesson?.questions[currentQuestion]?.options;
			const answer = currentLesson?.questions[currentQuestion]?.answer;

			const handleAnswer = (userAns: string) => {
				if (currentLesson!.questions?.length - 1 === currentQuestion) {
					navigate(-1);
				} else if (!(answer === userAns)) {
					notification.error({
						message: 'Oh oh, you have a mistake',
						duration: 5,
						placement: 'topRight',
					});
				}
				setCurrentQuestion((prev) => prev + 1);
			};

			return options?.map((option: string) => (
				<Button
					className='border-white !hover:bg-white !hover:text-[#A3C644] flex-1 my-2'
					size='large'
					key={option}
					onClick={() => handleAnswer(option)}
					type='text'>
					<span className='text-white'>{option}</span>
				</Button>
			));
		},
		READING: () => <></>,
	};

	const AnswerComponents: Record<QuestionType, Function> = {
		MATCH: () => (
			<div className='w-full px-3 py-4 border-white border-2 rounded-lg mt-2 h-12 flex items-center'>
				{answerArray.map((answ, idx: number, initialArray) => (
					<>
						<Typography.Text
							onClick={() => {
								const newArray = [...initialArray];
								newArray.splice(idx, 1);
								setAnswerArray(newArray);
							}}
							className='hover:text-gray-400 transition-all text-lg'
							style={{
								color: 'white',
							}}>
							{answ}
						</Typography.Text>
						<span>&nbsp;</span>
					</>
				))}
			</div>
		),
		MCQ: () => <></>,
		READING: () => <></>,
	};

	const handleCheck = () => {
		if (currentLesson!.questions?.length - 1 === currentQuestion) {
			navigate(-1);
		} else {
			const userAnswer = answerArray.join(' ');
			const currentAnswer = currentLesson?.questions[currentQuestion]?.answer;

			// Function to calculate Jaccard similarity coefficient
			const calculateJaccardSimilarity = (str1: string, str2: string) => {
				const set1 = new Set(str1.split(' '));
				const set2 = new Set(str2.split(' '));

				const intersection = new Set([...set1].filter((x) => set2.has(x)));
				const union = new Set([...set1, ...set2]);

				return intersection.size / union.size;
			};

			// Calculate Jaccard similarity coefficient
			const similarity = calculateJaccardSimilarity(userAnswer, currentAnswer!);

			// Check if similarity is at least 50%
			const isMatch = similarity >= 0.5;

			if (!isMatch) {
				notification.error({
					message: 'Oh oh, you have a mistake',
					duration: 5,
					placement: 'topRight',
				});
			}
			setCurrentQuestion((prev) => prev + 1);
			setAnswerArray([]);
		}
	};

	return (
		<Layout
			style={{
				height: 'calc(100vh - 72px)',
			}}
			className='bg-[#A3C644] text-white'>
			<Flex
				justify='space-between'
				align='center'>
				<Button
					type='text'
					icon={<CloseOutlined className='text-white' />}
				/>
				<Progress
					showInfo={false}
					percent={(currentQuestion / currentLesson?.questions?.length) * 100}
				/>
			</Flex>
			<Flex
				vertical
				justify='space-between'
				className='mt-2'>
				<Typography.Title
					className='text-white text-center'
					style={{
						color: 'white',
					}}
					level={2}>
					{id}
				</Typography.Title>
				<div className='w-full text-center text-white'>
					<div className='text-lg'>Current Question: {currentQuestion}</div>
				</div>
				<Flex
					vertical
					className='px-3 text-xl'>
					<div className='w-full px-3 py-4 border-white border-2 rounded-lg '>
						{currentLesson?.questions[currentQuestion]?.question}
					</div>

					{AnswerComponents[
						currentLesson?.questions?.[currentQuestion]?.type!
					]()}

					{QuestionComponent?.[
						currentLesson?.questions?.[currentQuestion]?.type!
					](currentLesson, currentQuestion)}

					{currentLesson?.questions?.[currentQuestion]?.type === 'MATCH' && (
						<Space>
							<Button
								onClick={() => handleCheck()}
								type='default'>
								Check
							</Button>
						</Space>
					)}
				</Flex>
			</Flex>
		</Layout>
	);
}
