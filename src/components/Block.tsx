import { ReactNode, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Flex } from 'antd';

interface IProps {
	children: ReactNode;
	path: string;
}

export const Block: FC<IProps> = ({ children, path }) => {
	const navigate = useNavigate();

	return (
		<Card
			styles={{
				body: {
					width: '100%',
					height: '100%',
				},
			}}
			onClick={() => {
				navigate(path);
			}}
			className='w-64 h-64 hover:bg-gray-200 cursor-pointer transition-all shadow-md'>
			<Flex
				className='w-full h-full'
				wrap='wrap'
				justify='center'
				align='center'>
				{children}
			</Flex>
		</Card>
	);
};
