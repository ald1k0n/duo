import { Card } from "antd";
import { FC } from "react";
import { CheckOutlined } from "@ant-design/icons";

type IProps = {
  title?: string;
  isDone?: boolean;
};

export const Disc: FC<IProps> = ({ title, isDone }) => {
  return (
    <div>
      <Card
        className={`${
          isDone ? "bg-[#39c2d7]" : "bg-[#d9d9d9]"
        } w-[125px] h-[80px] md:w-[140px] md:h-[90px] ${
          isDone ? "hover:bg-gray-300" : "hover:bg-[#8cdfe4]"
        } text-center shadow-xl flex justify-center items-center  top-[-8px] left-0 right-0 mx-auto`}
        style={{
          zIndex: 2,
          border: "none",
          boxShadow: "0 8px 4px 0 rgba(0,0,0,.25)",
          borderBottom: "none",
          borderRadius: "50%",
        }}
      >
        {isDone ? (
          <CheckOutlined
            style={{
              transform: "rotateX(40deg)",
              fontSize: "60px",
              color: "white",
            }}
          />
        ) : (
          <CheckOutlined
            style={{
              transform: "rotateX(40deg)",
              fontSize: "60px",
              color: "#B1B1B1",
            }}
          />
        )}
      </Card>
    </div>
  );
};
