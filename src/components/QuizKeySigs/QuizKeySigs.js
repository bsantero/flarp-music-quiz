import React, { useState } from 'react';
// import Settings from '../Settings/Settings';
import { keyofc, chromatic, defCircleSignatures } from '../../utils/Keys.js';
import conLog from '../../utils/conLog.js';
import { reorder } from './utils/KeySigUtils';
import './styles/style.css';
import './styles/circle.css';
import './styles/mediaqueries.css';

const random = require('@aspiesoft/random-number-js');

// OPTIONS

const DEFAULT_NEW_GAME = true;
const DEFAULT_ANSWER = { pitch: '0', mode: 'major' };
const DEFAULT_INPUT_TYPE = 'keyboard';
// [ 'chromatic', 'keyboard', 'circlefifths' ]
const DEFAULT_MODE_PREF = 'qualities'; // Major | Minor
// const DEFAULT_MODE_PREF = 'modes'; // Only modes
// const DEFAULT_MODE_PREF = 'both'; // modes and "Major" | "Minor"
const DEFAULT_ROTATE_PREF = 'false'; // Major | Minor

export function QuizModule() {
  const [generated, updateGenerated] = useState(!DEFAULT_NEW_GAME);
  const [score, updateScore] = useState(0);
  const [keySigs, updateKeySigs] = useState(chromatic);
  const [answerPitch, setAnswerPitch] = useState(DEFAULT_ANSWER.pitch);
  const [answerMode, setAnswerMode] = useState(DEFAULT_ANSWER.mode);
  const [imgSrc, updateImgSrc] = useState(getUri(DEFAULT_ANSWER.pitch));

  // Set score, todo: get score from storage

  const [modePref, updateModePref] = useState(DEFAULT_MODE_PREF);
  const [wrongGuesses, updateWrongGuesses] = useState([]);
  const [inputType, updateInputType] = useState(DEFAULT_INPUT_TYPE);
  const [userPrefRotate, updatePrefRotate] = useState(DEFAULT_ROTATE_PREF);

  function getInputType(p) {
    const arr = ['chromatic', 'keyboard', 'circlefifths'];
    return arr[p];
  }

  function switchInputType() {
    const arr = ['chromatic', 'keyboard', 'circlefifths'];
    const next = inputType + 1 || 0;
    updateInputType(arr[next]);
  }

  function getUri(index) {
    let newUri;
    if (!keySigs[index].uri) {
      newUri = keySigs[index]['default'].uri;
    } else {
      newUri = keySigs[index].uri;
    }
    return newUri;
  }

  function getMode(modePref) {}

  function generateNewQuestion(oldAnswer) {
    console.log('Generating a new key.');
    const keySigsLength = Object.keys(keySigs).length;
    let newAnswer = oldAnswer;
    let newImgSrc = '';

    while (newAnswer === oldAnswer) {
      newAnswer = random(0, 11);
    }
    let modeRandomInt = null;
    let newMode;
    // generate new Mode
    switch (modePref) {
      case 'both':
        modeRandomInt = random(0, 8);
        console.log("Mode was then. generated as 'both'.");
      case 'modes':
        console.log("Mode was generated as 'only modes'.");
        if (!modeRandomInt) {
          modeRandomInt = random(0, 6);
        }
        // newMode set to 'only modes'
        switch (modeRandomInt) {
          case 0:
            newMode = 'Ionian';
          case 1:
            newMode = 'Dorian';
          case 2:
            newMode = 'Phrygian';
          case 3:
            newMode = 'Lydian';
          case 4:
            newMode = 'Mixolydian';
          case 5:
            newMode = 'Aeolian';
          case 6:
            newMode = 'Locrian';
          case 7:
            newMode = 'major';
          case 8:
            newMode = 'minor';
        }
        break;
      // newMode set to 'all modes + m/m'
      case 'qualities':
        console.log("Mode was generated as 'Major/Minor'.");
        newMode = parseInt(newMode) % 2 == 0 ? 'major' : 'minor';
        break;
      default:
        console.log("Mode was generated as 'Major/Minor' (default).");
    }

    setAnswerPitch(newAnswer);
    setAnswerMode(newMode);
    updateImgSrc(getUri(newAnswer));
    console.log('newAnswer and Mode are:');
    console.log(keySigs[newAnswer].label);
    console.log(newMode);
  }

  function handleSkip() {
    updateScore(score - 1);
  }

  function handleClick(props) {
    console.log(props.btnKey);
    const btn = props.btnKey;
    const newWrongs = [...wrongGuesses];

    // Test the input against the keyId
    if (props.winner === true) {
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

  function ShowAnswer() {
    return answerPitch;
  }

  function QuestionQuality({ quality }) {
    // const an = ''; // TEMP
    conLog(quality);
    console.log(quality);
    if (quality == 'major') {
      return <b>Major</b>;
    } else {
      return <b>minor</b>;
    }
  }

  function QuestionBar() {
    return (
      <div className="child Question-bar">
        <h3 className="question">
          What's this key in <QuestionQuality quality={answerMode} />?
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
      <div className="score-container">
        <h5 className="score">{score}</h5>
      </div>
    );
  }

  function InputButtons({ numOfButtons, inputType }) {
    console.log(`let's create ${numOfButtons} buttons in a pattern of:`);
    console.log(`\t${inputType}`);
    console.log(`\tWrongs: ${wrongGuesses}`);

    let className = '';
    let keyClassName;

    function NewButton(props) {
      if (inputType == 'keyboard') {
        return (
          <div className={props.containerStyle}>
            {/* <div className="label"> */}
            <button
              className={props.styles}
              onClick={() => handleClick(props)}
            ></button>
            {/* </div> */}
          </div>
        );
      } else {
        return (
          <div className={props.containerStyle}>
            {/* <div className="label"> */}
            <button className={props.styles} onClick={() => handleClick(props)}>
              {props.label}
            </button>
            {/* </div> */}
          </div>
        );
      }
    }

    // Generate new array of inputs
    const chromaticKeys = Object.keys(keySigs);
    console.log(chromaticKeys); // ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
    let newKeys;
    switch (userPrefRotate) {
      case 'false':
        newKeys = chromaticKeys;
        console.log(newKeys);
        break;
      case 'true':
        newKeys = reorder(chromaticKeys, 9); // ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
        console.log(newKeys);
        break;
    }

    // create Returned Array of buttons;
    let buttons = [];

    // Ordering Input button logic

    newKeys.forEach((i) => {
      let note;
      let name;
      let isWinner;

      if (i == answerPitch) {
        isWinner = true;
      } else {
        isWinner = false;
      }
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
        className = className + ' loser';
      }

      if (inputType == 'keyboard') {
        switch (parseInt(i)) {
          case 0:
          case 2:
          case 4:
          case 5:
          case 7:
          case 9:
          case 11:
            console.log(`key ${i} is white`);
            keyClassName = `piano-key white key-${i}`;
            className = 'white-btn';
            break;
          case 1:
          case 3:
          case 6:
          case 8:
          case 10:
            console.log(`key ${i} is black`);
            keyClassName = `piano-key black key-${i}`;
            className = 'black-btn';
            break;
        }
      } else {
        className = 'themed-button';
        keyClassName = `tick key-${i}`;
      }

      buttons.push(
        <NewButton
          btnKey={i}
          winner={isWinner}
          wrongs={wrongGuesses}
          updateWrongs={updateWrongGuesses}
          styles={className}
          containerStyle={keyClassName}
          key={i}
          label={name}
        />
      );
    });

    return buttons;
  }

  function QuizInput() {
    let parentClass;
    let childClass;
    let label;
    console.log('inputType will be:');
    console.log(inputType);
    switch (inputType) {
      case 'circlefifths':
        parentClass = 'child input-button-container circleOfFifths';
        childClass = 'circle';
        label = 'Circle of Fifths';
        break;
      case 'keyboard':
        parentClass = 'child input-button-container keyboard-container';
        childClass = 'piano';
        label = 'Keyboard';
        break;
      case 'chromatic':
        parentClass = 'child input-button-container chromatic-container';
        childClass = 'chromatic';
        label = 'chromatic';
        break;
    }

    return (
      <div className={parentClass}>
        <div className={childClass}>
          <ScoreBoard />
          <InputButtons
            numOfButtons={12}
            inputType={inputType}
            clickHandler={handleClick}
            label={label}
          />
        </div>
      </div>
    );
    // console.log(keySigs);
  }

  // ... end JSX Components

  // Main function's Return ...

  return (
    <main className="Quiz-main">
      {/* <ShowAnswer /> */}
      <QuestionBar />
      <ImageContainer />
      <QuizInput />
      <SkipButton />
    </main>
  );
}

export function SettingsMenu() {
  return (
    <div>
      <button>Chromatic</button>
      <button>4</button>
      <button>7</button>
      <button>3</button>
    </div>
  );
}

export default { QuizModule, SettingsMenu };
