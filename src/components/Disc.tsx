import { Card } from 'antd';
import { FC } from 'react';

type IProps = {
	title?: string;
	isDone?: boolean;
};

export const Disc: FC<IProps> = ({ title, isDone }) => {
	return (
		<div className='relative cursor-pointer'>
			<Card
				className={`bg-gray-600 rounded-full  w-[69px] h-[65px] md:w-[140px] md:h-[112px] shadow-xl flex justify-center items-center`}
				style={{ zIndex: 1 }}></Card>
			<Card
				className={`${
					!isDone ? 'bg-[#D9D9D9]' : 'bg-red-700'
				} rounded-full w-[69px] h-[65px] md:w-[140px] md:h-[112px] hover:bg-gray-300 shadow-xl flex justify-center items-center absolute top-[-8px] left-0 right-0 mx-auto`}
				style={{ zIndex: 2 }}>
				{title}
			</Card>
		</div>
	);
};
