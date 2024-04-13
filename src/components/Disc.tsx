import { Card } from 'antd';
import { FC } from 'react';

type IProps = {
	title?: string;
	isDone?: boolean;
};

export const Disc: FC<IProps> = ({ title, isDone }) => {
	return (
		<Card
			className={`${
				!isDone ? 'bg-gray-200' : 'bg-red-700'
			} rounded-full w-32 h-24 hover:bg-gray-300 shadow-xl`}>
			{title}
		</Card>
	);
};
