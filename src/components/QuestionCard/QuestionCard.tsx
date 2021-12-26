import React from "react";
import { AnswerObject } from "../../App";
import "./QuestionCard.scss";

interface QuestionCardProps {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
  userIndex: number;
  correctIndex: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
  userIndex,
  correctIndex,
}) => {
  return (
    <article className='question-card'>
      <p className='question-number'>
        Question: {questionNr} / {totalQuestions}
      </p>
      <p className='question' dangerouslySetInnerHTML={{ __html: question }} />
      <div className='answers'>
        {answers.map((answer, index) => {
          return (
            <div key={index} className={index.toString()}>
              <button
                disabled={userAnswer ? true : false}
                value={answer}
                onClick={callback}
                className={`button answer ${
                  userAnswer && index === userIndex ? "red" : null
                } ${userAnswer && index === correctIndex ? "green" : null}`}
              >
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </button>
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default QuestionCard;
