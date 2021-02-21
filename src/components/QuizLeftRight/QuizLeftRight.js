import React from 'react';

// const NEW_GAME = 1;
const DEFAULT_MESSAGE = `Welcome to Quiz 1. Left? or Right?`;

export function QuizModule() {
  // const [correct, setCorrect] = useState(true);
  const [message, setMessage] = React.useState(DEFAULT_MESSAGE);
  const [answer, setAnswer] = React.useState(getAnswer);
  const [selection, setSelection] = React.useState();

  function getAnswer() {
    return Math.random() >= 0.5 ? 'left' : 'right';
  }

  function generateNewAnswer() {
    setMessage('Guess, please!');
    setSelection();
    console.log(`new answer is:`);
    setAnswer(getAnswer);
  }

  function handleClick(e) {
    console.log(`clicked ${e}`);
    setSelection(e);
    if (e === answer) {
      console.log(`winner`);
      setTimeout(function () {
        setMessage('Correct!');
        setTimeout(function () {
          setMessage('Generating..');
          setTimeout(function () {
            generateNewAnswer();
          }, 1500);
        }, 1000);
      }, 400);
    } else if (e !== answer) {
      setTimeout(function () {
        setMessage('Incorrect..');
      }, 400);
    }
  }

  return (
    <>
      <div>
        <h1 className="">{message}</h1>
        <h1 className="capitalize">{selection}</h1>
      </div>
      <span className="flex">
        <button className="quiz-button" onClick={() => handleClick('left')}>
          Left!
        </button>
        <button className="quiz-button" onClick={() => handleClick('right')}>
          Right!
        </button>
      </span>
    </>
  );
}

export default QuizModule;
