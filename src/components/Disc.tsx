<<<<<<< HEAD
import { Card } from "antd";
import { FC } from "react";
import { CheckOutlined } from "@ant-design/icons";
=======
import { Card } from 'antd';
import { FC } from 'react';

>>>>>>> 7c8814155294d8e462a68d030ea3601bda3d08db
type IProps = {
	title?: string;
	isDone?: boolean;
};

export const Disc: FC<IProps> = ({ title, isDone }) => {
<<<<<<< HEAD
  return (
    <div>
      <Card
        className={`${
          isDone ? "bg-[#39c2d7]" : "white"
        } w-[69px] h-[69px] md:w-[140px] md:h-[90px] hover:bg-gray-300 shadow-xl flex justify-center items-center  top-[-8px] left-0 right-0 mx-auto`}
        style={{
          zIndex: 2,
          boxShadow: "0 8px 4px 0 rgba(0,0,0,.25)",
          borderBottom: "none",
          borderRadius: "50%",
        }}
      >
        {isDone ? (
          <CheckOutlined
            style={{
              fontSize: "60px",
              color: "white",
            }}
          />
        ) : (
          title
        )}
      </Card>
    </div>
  );
=======
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
>>>>>>> 7c8814155294d8e462a68d030ea3601bda3d08db
};
