import { ReactNode, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Flex } from 'antd';

interface IProps {
	question: ;
}

export const Question: FC<IProps> = ({ question }) => {
	return (
		<div>
      <h1>{question.question}</h1>
      <ul>
        {question.options.map((option, index) => (
          <li key={index}>
            <button onClick={() => handleOptionClick(index)}>{option}</button>
          </li>
        ))}
      </ul>
    </div>
	);
};



let question = {
  question: "Кто убил Кений?",
  options: ["Юта", "Гожо", "Итадори", "Сукуна"],
  answer: 0,
};

const handleOptionClick = (index) => {
  // Check if the selected answer is correct
  alert(index === question.answer ? "Correct!" : "Wrong!");
};

export default function Reading() {
  return (
    
  );
}
