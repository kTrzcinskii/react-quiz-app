import React from "react";
import "./Score.scss";

interface ScoreProps {
  score: number;
}

export const Score: React.FC<ScoreProps> = ({ score }) => {
  return (
    <div className='score'>
      Score: <span className='score__span'>{score}</span>
    </div>
  );
};

export default Score;
