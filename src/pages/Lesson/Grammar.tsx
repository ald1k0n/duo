import {
	Button,
	Flex,
	Layout,
	notification,
	Space,
	Spin,
	Typography,
} from 'antd';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Progress } from 'antd';
import { useModulesStore } from '@/shared/stores/useModulesStore';
import { AudioOutlined, CloseOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';

import { QuestionType } from '@/types';
import { ModuleService } from '@/services';
import axios from 'axios';

const answers: Record<QuestionType, Function> = {
	MATCH: (answer: string) => answer.split(' '),
	MCQ: (answer: any) => answer,
	READING: (answer: any) => answer,
	AUDIO: (answer: any) => answer,
};

const questionTitle: Record<QuestionType, string> = {
	MATCH: 'Дұрыс ретте толтырыңыз',
	MCQ: 'Дұрысын таңдаңыз',
	READING: '',
	AUDIO: 'Tynda',
};

export default function Lesson() {
	const { id } = useParams();
	const { currentLesson } = useModulesStore();
	const { state } = useLocation();

	const [sending, setSending] = useState(false);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
	const [answerArray, setAnswerArray] = useState<string[]>([]);

	const navigate = useNavigate();

	useEffect(() => {
		if (!state && !currentLesson) {
			navigate(-1);
		}
	}, [currentLesson, state]);

	useEffect(() => {
		if (state?.isAudio) {
			setSending(true);
			const currentText = currentLesson?.questions[currentQuestion].question;

			(async () => {
				try {
					const response = await axios.get(
						`http://10.101.21.210:8000/api/text2speech?text=${currentText}`,
						{ responseType: 'blob' }
					);
					if (response.data instanceof Blob) {
						setAudioBlob(response.data);
						setSending(false);
					} else {
						console.error('Response data is not a Blob:', response.data);
						setSending(false);
					}
				} catch (error) {
					notification.error({
						message: 'Error happened',
						duration: 5,
						placement: 'topRight',
					});
				}
			})();
		}
	}, [currentQuestion, state]);

	const moduleService = new ModuleService();
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

			const handleAnswer = async (userAns: string) => {
				if (currentLesson!.questions?.length - 1 === currentQuestion) {
					await moduleService.passModule({
						lessonIndex: state.lessonIdx,
						moduleId: state.moduleData?.moduleId,
					});
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
		AUDIO: () => {
			function levenshteinDistance(s: string, t: string): number {
				const m = s.length;
				const n = t.length;
				const d: number[][] = [];

				// Step 1: Create a matrix
				for (let i = 0; i <= m; i++) {
					d[i] = Array(n + 1).fill(0);
					d[i][0] = i; // deletion
				}
				for (let j = 0; j <= n; j++) {
					d[0][j] = j; // insertion
				}

				// Step 2: Fill the matrix
				for (let j = 1; j <= n; j++) {
					for (let i = 1; i <= m; i++) {
						const cost = s[i - 1] === t[j - 1] ? 0 : 1;

						d[i][j] = Math.min(
							d[i - 1][j] + 1, // deletion
							d[i][j - 1] + 1, // insertion
							d[i - 1][j - 1] + cost // substitution
						);
					}
				}

				return d[m][n];
			}

			function similarityPercentage(
				original: string,
				userString: string
			): number {
				const distance = levenshteinDistance(original, userString);
				const maxLength = Math.max(original.length, userString.length);
				return (1 - distance / maxLength) * 100;
			}

			const addAudioElement = async (blob: Blob) => {
				const formData = new FormData();
				formData.append('file', blob);
				setSending(true);
				try {
					const response = await axios.post(
						'http://10.101.21.210:8080/audio/upload',
						formData
					);
					const whisper = response.data.replace('[kk] ', '');
					const question = currentLesson?.questions[
						currentQuestion
					]?.question?.replace(',', '');
					const percent =
						similarityPercentage(whisper, question!).toFixed(2) + '%';
					notification.success({
						message: `Your answer ${percent} correct`,
						duration: 5,
						placement: 'topRight',
					});
					setSending(false);
					if (currentLesson!.questions?.length - 1 === currentQuestion) {
						await moduleService.passModule({
							lessonIndex: state.lessonIdx,
							moduleId: state.moduleData?.moduleId,
						});
						navigate(-1);
					} else setCurrentQuestion((prev) => prev + 1);
				} catch (error) {
					setSending(false);

					console.error(error);
				}
			};
			return (
				<>
					<AudioRecorder
						onRecordingComplete={addAudioElement}
						audioTrackConstraints={{
							noiseSuppression: true,
							echoCancellation: true,
						}}
						downloadFileExtension='wav'
					/>
				</>
			);
		},
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
		AUDIO: () => (
			<>
				<Button
					disabled={!audioBlob}
					icon={<AudioOutlined />}
					onClick={() => {
						const audio = new Audio();
						const audioUrl = URL.createObjectURL(audioBlob!);
						audio.src = audioUrl;
						audio.play();
						audio.onended = () => URL.revokeObjectURL(audioUrl);
					}}>
					Play Audio
				</Button>
			</>
		),
	};

	const handleCheck = async () => {
		if (currentLesson!.questions?.length - 1 === currentQuestion) {
			await moduleService.passModule({
				lessonIndex: state.lessonIdx,
				moduleId: state.moduleData?.moduleId,
			});
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
			const isMatch = similarity >= 0.7;

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
				minHeight: 'calc(100vh - 72px)',
			}}
			className='bg-[#A3C644] text-white min-h-screen'>
			<Flex
				className='h-full'
				justify='space-between'
				align='center'>
				<Button
					type='text'
					icon={<CloseOutlined className='text-white' />}
				/>
				<Progress
					showInfo={false}
					percent={
						(currentQuestion / (currentLesson?.questions?.length - 1)) * 100
					}
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
				<div className='w-full text-white'>
					<div className='text-lg font-semibold px-3'>
						{questionTitle[currentLesson?.questions?.[currentQuestion]?.type!]}
					</div>
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
			<Spin
				spinning={sending}
				fullscreen
			/>
		</Layout>
	);
}
