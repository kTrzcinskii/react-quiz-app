import React from "react";
import "./FinalScore.scss";

interface FinalScoreProps {
  score: number;
  rounds: number;
}

export const FinalScore: React.FC<FinalScoreProps> = ({ score, rounds }) => {
  return (
    <div>
      <h1 className='final-score'>
        Your final score:{" "}
        <span className='final-score__span'>
          {score} / {rounds}
        </span>
      </h1>
      <h2 className='wanna-play'>Wanna play again?</h2>
    </div>
  );
};

export default FinalScore;
