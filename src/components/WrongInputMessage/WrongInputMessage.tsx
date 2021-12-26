import React from "react";
import "./WrongInputMessage.scss";

export const WrongInputMessage: React.FC = () => {
  return (
    <div className='wrong-input'>
      <p>Please fill in all inputs before starting the quiz!</p>
    </div>
  );
};

export default WrongInputMessage;
