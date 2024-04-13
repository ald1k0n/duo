import { Card } from 'antd';
import { FC } from 'react';

interface IProps {
	title?: string;
	isDone?: boolean;
}

export const Disc: FC<IProps> = ({ title, isDone }) => {
	return (
		<Card className={`${isDone ? 'bg-white' : 'bg-red-700'}`}>{title}</Card>
	);
};
