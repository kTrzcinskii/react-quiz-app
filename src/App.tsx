import React, { useState } from "react";
import { Difficulty, fetchQuizQuestions, QuestionState } from "./API";
import FinalScore from "./components/FinalScore/FinalScore";
import Loading from "./components/Loading/Loading";
import QuestionCard from "./components/QuestionCard/QuestionCard";
import Score from "./components/Score/Score";
import "./App.scss";
import WrongInputMessage from "./components/WrongInputMessage/WrongInputMessage";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [userIndex, setUserIndex] = useState(0);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [gamePlayed, setGamePlayed] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(5);
  const [rounds, setRounds] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty | string>(
    Difficulty.EASY
  );
  const [wrongInput, setWrongInput] = useState(false);

  const handleWrongInput = () => {
    console.log("wrong input");
    setWrongInput(true);
    setTimeout(() => setWrongInput(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (totalQuestions && difficulty) {
      setWrongInput(false);
      startQuiz();
    } else {
      handleWrongInput();
    }
  };

  const startQuiz = async () => {
    setScore(0);
    setLoading(true);
    setGameOver(false);
    setRounds(totalQuestions);

    const newQuestions = await fetchQuizQuestions(totalQuestions, difficulty);

    setQuestions(newQuestions);

    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
    setGamePlayed(true);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // users answer
      const answer = e.currentTarget.value;
      // set index of user answer
      setUserIndex(parseInt(e.currentTarget.parentElement?.classList[0]!));
      // set index of correct answer
      setCorrectIndex(
        questions[number].answers.indexOf(questions[number].correct_answer)
      );
      // check answer
      const correct = questions[number].correct_answer === answer;
      // Add score
      if (correct) {
        setScore((prev) => prev + 1);
      }
      //save answer for userAnswers
      const AnswerObject: AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, AnswerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion !== totalQuestions) {
      setNumber(nextQuestion);
    } else {
      setGameOver(true);
    }
  };

  return (
    <>
      <header>
        <h1>React Quiz</h1>
      </header>
      <main
        className={`${gamePlayed ? null : "smaller"} ${
          gameOver && gamePlayed ? "play-again" : null
        }`}
      >
        {gameOver && gamePlayed && <FinalScore score={score} rounds={rounds} />}
        {wrongInput && <WrongInputMessage />}
        {gameOver ? (
          <div className='form-container'>
            <form onSubmit={handleSubmit}>
              <div className='input-container'>
                <label htmlFor='numberOfQuestions'>
                  {" "}
                  Enter number of questions:
                </label>
                <div className='input-container__number'>
                  <div className='input-container__number__hover'>
                    <input
                      className='number-input'
                      type='number'
                      id='numberOfQuestions'
                      min={1}
                      max={20}
                      value={totalQuestions}
                      onChange={(e) =>
                        setTotalQuestions(parseInt(e.target.value))
                      }
                    />
                  </div>
                </div>
              </div>
              <div className='input-container'>
                <label htmlFor='difficultyLevel'>
                  Choose difficulty level:{" "}
                </label>

                <select
                  name='difficultyLevel'
                  id='difficultyLevel'
                  className='select-input'
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value={Difficulty.EASY}>easy</option>
                  <option value={Difficulty.MEDIUM}>medium</option>
                  <option value={Difficulty.HARD}>hard</option>
                </select>
              </div>
              <button className='button start' type='submit'>
                Start
              </button>
            </form>
          </div>
        ) : null}
        {!gameOver ? <Score score={score} /> : null}
        {loading && <Loading />}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={totalQuestions}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
            correctIndex={correctIndex}
            userIndex={userIndex}
          />
        )}
        {gamePlayed && !gameOver && (
          <button
            className={`${
              !gameOver && !loading && userAnswers.length === number + 1
                ? "next-question button larger show"
                : "next-question button larger"
            }`}
            disabled={userAnswers[number] ? false : true}
            onClick={nextQuestion}
          >
            {number === totalQuestions - 1 &&
            userAnswers.length === questions.length
              ? "Done"
              : "Next Question"}
          </button>
        )}
      </main>
    </>
  );
};

export default App;
