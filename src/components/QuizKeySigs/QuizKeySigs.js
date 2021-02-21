import React, { useState } from 'react';
import { keyofc, chromatic, defCircleSignatures } from '../../utils/Keys.js';
import conLog from '../../utils/conLog.js';
import './styles/style.css';
import './styles/circle.css';
import './styles/mediaqueries.css';

const random = require('@aspiesoft/random-number-js');

// OPTIONS

const DEFAULT_NEW_GAME = true;
const DEFAULT_ANSWER = 0;
const DEFAULT_INPUT_MODE = 'circlefifths';
// const DEFAULT_INPUT_MODE = 'keyboard';
const DEFAULT_MODE = 'false'; // Major | Minor
// const DEFAULT_MODE = 'true'; // Only modes
// const DEFAULT_MODE = 'both'; // modes and "Major" | "Minor"

export function QuizModule() {
  const [generated, updateGenerated] = useState(!DEFAULT_NEW_GAME);
  const [score, updateScore] = useState(0);
  const [keySigs, updateKeySigs] = useState(chromatic);
  const [answer, setAnswer] = useState(DEFAULT_ANSWER);
  const [imgSrc, updateImgSrc] = useState(getUri(DEFAULT_ANSWER));

  // Set score, todo: get score from storage

  const [mode, updateMode] = useState(DEFAULT_MODE);
  const [wrongGuesses, updateWrongGuesses] = useState([]);
  const [inputType, updateInputType] = useState(DEFAULT_INPUT_MODE);

  function getUri(index) {
    let newUri;
    if (!keySigs[index].uri) {
      newUri = keySigs[index]['default'].uri;
    } else {
      newUri = keySigs[index].uri;
    }
    return newUri;
  }

  function generateNewQuestion(oldAnswer) {
    console.log('Generating a new key.');
    const keySigsLength = Object.keys(keySigs).length;
    let newAnswer = oldAnswer;
    let newImgSrc = '';

    while (newAnswer === oldAnswer) {
      newAnswer = random(0, 11);
    }
    setAnswer(newAnswer);
    updateImgSrc(getUri(newAnswer));
    console.log('newAnswer is:');
    console.log(keySigs[newAnswer].label);
  }

  function handleSkip() {
    updateScore(score - 1);
  }

  function handleClick(props) {
    const btn = props.btnKey;
    const newWrongs = [...wrongGuesses];

    // Test the input against the keyId
    if (btn === answer) {
      // Wins
      console.log('Winner!');
      updateScore(score + 1);
      updateWrongGuesses([]);
      generateNewQuestion();
    } else {
      // Loses
      console.log("YOU'RE A FAILURE, HARRY");
      updateScore(score - 1);
      newWrongs.push(btn);
      updateWrongGuesses(newWrongs);
    }
  }

  // JSX Components ...

  function QuestionQuality() {
    const qual = 'major'; // TEMP
    if (qual == 'major') {
      return <b>Major</b>;
    } else {
      return <b>minor</b>;
    }
  }

  function QuestionBar() {
    return (
      <div className="child Question-bar">
        <h3 className="question">
          What's this key in <QuestionQuality />?
        </h3>
      </div>
    );
  }

  function ImageContainer() {
    return (
      <div className="child image-container">
        <img src={imgSrc} className="key-img" alt="logo" />
      </div>
    );
  }

  function SkipButton() {
    return (
      <span className="child skip-container">
        <button className="Skip-button themed-button" onClick={handleSkip}>
          Skip!
        </button>
      </span>
    );
  }

  function ScoreBoard() {
    return (
      <div className="Score">
        <h5>{score}</h5>
      </div>
    );
  }

  function InputButtons({
    numOfButtons,
    clickHandler,
    shiftMinorPref,
    inputType
  }) {
    // console.log(`let's create ${numOfButtons} buttons in a pattern of:`);
    // console.log(`\ta ${shiftMinorPref ? 'shifting' : 'non-shifting'}:`);
    // console.log(`\t${inputType}`);
    // console.log(`\tWrongs: ${wrongGuesses}`);

    let className = 'themed-button';
    let buttons = [];

    function NewButton(props) {
      return (
        <div className="tick">
          <div className="label">
            <button className={props.styles} onClick={() => handleClick(props)}>
              {props.label}
            </button>
          </div>
        </div>
      );
    }

    for (let i = 0; i < numOfButtons; i++) {
      let note;
      let name;

      if (!keySigs[i].label) {
        note = keySigs[i].default;
        // console.log(note.label);
      } else {
        // name = note.label.toLowerCase();
        note = keySigs[i];
      }
      name = note.label;

      if (wrongGuesses.includes(i)) {
        console.log(`\tis wrong`);
        className = 'themed-button loser';
      } else {
        className = 'themed-button';
      }
      buttons.push(
        <NewButton
          btnKey={i}
          wrongs={wrongGuesses}
          updateWrongs={updateWrongGuesses}
          styles={className}
          key={i}
          label={name}
        />
      );
    }

    return buttons;
  }

  function QuizInput() {
    // console.log(keySigs);
    return (
      <div className="child circleOfFifths">
        <ScoreBoard />
        <div className="circle">
          <InputButtons
            numOfButtons={12}
            inputType="circlefifths"
            shiftMinorPref={false}
            clickHandler={handleClick}
          />
        </div>
      </div>
    );
  }

  // ... end JSX Components

  // Main function's Return ...

  return (
    <main className="Quiz-main">
      <QuestionBar />
      <ImageContainer />
      <QuizInput />
      <SkipButton />
    </main>
  );
}

export default QuizModule;
