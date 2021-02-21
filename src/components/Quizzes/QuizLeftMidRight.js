import React from 'react';
import conLog from '../../utils/conLog';

// const NEW_GAME = 1;
const DEFAULT_MESSAGE = 'Quiz 2!';

export function QuizLeftMidRight() {
  // const [correct, setCorrect] = useState(true);
  const [message, setMessage] = React.useState(DEFAULT_MESSAGE);
  const [answer, setAnswer] = React.useState(getAnswer);
  const [selection, setSelection] = React.useState(null);
  // conLog(answer);

  function getAnswer() {
    const random = require('@aspiesoft/random-number-js');
    const answer = random(1, 3);
    // conLog(answer);
    switch (answer) {
      case 1:
        return 'left';
      case 2:
        return 'middle';
      case 3:
        return 'right';
      default:
        return 'Error, not 1, 2, or 3!';
    }
  }

  function generateNewAnswer() {
    setMessage('Guess, please!');
    setSelection(null);
    console.log(`new answer is:`);
    console.log(`${answer}`);
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
        <button className="quiz-button" onClick={() => handleClick('middle')}>
          Middle!
        </button>
        <button className="quiz-button" onClick={() => handleClick('right')}>
          Right!
        </button>
      </span>
    </>
  );
}

export default QuizLeftMidRight;
