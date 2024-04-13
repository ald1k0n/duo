import { Card } from 'antd';
import { FC } from 'react';

type IProps = {
	title?: string;
	isDone?: boolean;
};

export const Disc: FC<IProps> = ({ title, isDone }) => {
	return (
		<div>
			<Card
				className={`${
					!isDone ? 'bg-[#D9D9D9]' : 'bg-red-700'
				} rounded-full w-[69px] h-[69px] md:w-[140px] md:h-[140px] hover:bg-gray-300 shadow-xl flex justify-center items-center  top-[-8px] left-0 right-0 mx-auto`}
				style={{
					zIndex: 2,
					transform: 'rotateX(0.15turn)',
					boxShadow: '0 13px 4px 0 rgba(0,0,0,.25)',
				}}>
				{title}
			</Card>
		</div>
	);
};
