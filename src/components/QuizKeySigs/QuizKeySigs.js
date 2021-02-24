import React, { useState } from 'react';
// import Settings from '../Settings/Settings';
import { keyofc, chromatic, defCircleSignatures } from '../../utils/Keys.js';
import conLog from '../../utils/conLog.js';
import { reorder, capitalizeFirstLetter } from './utils/KeySigUtils';
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

export function SettingsMenu(props) {
  return (
    <div className="quiz-settings-container">
      <h1 className="options-header">Input Method</h1>
      <button
        className="quiz-option"
        disabled
        onClick={() => props.changeInput('chromatic')}
      >
        Chromatic
      </button>
      <button
        className="quiz-option"
        disabled
        onClick={() => props.changeInput('keyboard')}
      >
        Keyboard
      </button>
      <button
        className="quiz-option"
        disabled
        onClick={() => props.changeInput('circlefifths')}
      >
        Keyboard
      </button>
    </div>
  );
}

export function QuizModule() {
  const [generated, updateGenerated] = useState(!DEFAULT_NEW_GAME);
  const [score, updateScore] = useState(0);
  const [keySigs, updateKeySigs] = useState(chromatic);
  const [answerPitch, setAnswerPitch] = useState(DEFAULT_ANSWER.pitch);
  const [answerMode, setAnswerMode] = useState(DEFAULT_ANSWER.mode);
  const [imgSrc, updateImgSrc] = useState(
    getNoteData(DEFAULT_ANSWER.pitch, 'uri')
  );
  const [accidental, updateAccidental] = useState('default');

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

  function getNoteData(index, data, weighted = 'default') {
    let newData;
    if (!keySigs[index][weighted][data]) {
      // console.log(newUri);
      let newPitchObject = keySigs[index];
      let newDefault = newPitchObject[weighted];
      // console.log(newDefault);
      newData = newPitchObject[newDefault][data];
    } else {
      newData = keySigs[index][data];
    }
    console.log(newData);
    return newData;
  }

  function getMode(modePref) {}

  function generateNewQuestion(oldAnswer) {
    console.log('Generating a new key.');
    const keySigsLength = Object.keys(keySigs).length;
    let newAnswer = oldAnswer;
    let newImgSrc = '';

    while (newAnswer === oldAnswer) {
      newAnswer = random(0, 11);
      console.log(`Old: ${oldAnswer}. New: ${newAnswer}`);
    }
    let modeRandomInt = null;
    let newMode = null;
    // generate new Mode
    switch (modePref) {
      case 'both':
        modeRandomInt = random(0, 8);
        console.log("Mode was then generated as 'both'.");
        break;
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
            newMode = 'minor';
          case 8:
            newMode = 'Major';
        }
        break;
      // newMode set to 'all modes + m/m'
      case 'qualities':
        if (!modeRandomInt) {
          modeRandomInt = random(0, 8);
        }
        console.log(`Mode was generated as 'Major/Minor'.${modeRandomInt}`);
        newMode = modeRandomInt % 2 == 0 ? 'major' : 'minor';
        console.log(`Mode was changed.${newMode}`);
        break;
      default:
        console.log("Mode was generated as 'Major/Minor' (default).");
    }

    setAnswerPitch(newAnswer);
    setAnswerMode(newMode);
    updateImgSrc(getNoteData(newAnswer, 'uri'));
    console.log('newAnswer and Mode are:');
    console.log(newAnswer);
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
      generateNewQuestion(answerPitch);
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
    // conLog(quality);
    // console.log(quality);
    if (quality == 'major') {
      return <b>Major</b>;
    } else {
      return <b>minor</b>;
    }
  }

  function QuestionBar() {
    return (
      <div className="child question-container">
        <span className="question">
          What's this key in <QuestionQuality quality={answerMode} />?
        </span>
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
        <span className="score">{score}</span>
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
    // switch (userPrefRotate) {
    //   case 'false':
    newKeys = chromaticKeys;
    //     console.log(newKeys);
    //     break;
    //   case 'true':
    //     newKeys = reorder(chromaticKeys, 9); // ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
    //     console.log(newKeys);
    //     break;
    // }

    // create Returned Array of buttons;
    let buttons = [];
    let capitalize = false;

    let offset;
    switch (answerMode) {
      case 'major':
        capitalize = true;
        offset = 0;
        break;
      case 'minor':
        offset = 3;
        break;
      default:
        offset = 0;
    }

    // Ordering Input button logic
    const offsetArray = reorder(chromaticKeys, offset); // ['9', '10', '11', '0', '1', '2', '3', '4', '5', '6', '7', '8'];

    newKeys.forEach((i) => {
      const intdex = parseInt(i);
      let name;
      let isWinner;
      let offsetIndex;

      if (intdex + offset < newKeys.length) {
        offsetIndex = intdex + offset;
      } else {
        offsetIndex = intdex - (newKeys.length - offset);
      }
      // console.log(offsetIndex);

      // console.log(`${offsetIndex} is`);
      // console.log(chromatic[offsetIndex]);
      // console.log(chromatic[i]);

      if (answerPitch == offsetIndex) {
        console.log(`${i} is a winner.`);
        isWinner = true;
      } else {
        isWinner = false;
        // console.log(`${i} is a loser.`);
      }
      if (!keySigs[i].label) {
        if (capitalize) {
          name = capitalizeFirstLetter(getNoteData(i, 'label'));
        } else {
          name = getNoteData(i, 'label');
        }
      } else {
        name = 'err';
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
            // console.log(`key ${i} is white`);
            keyClassName = `piano-key white key-${i}`;
            className = 'white-btn';
            break;
          case 1:
          case 3:
          case 6:
          case 8:
          case 10:
            // console.log(`key ${i} is black`);
            keyClassName = `piano-key black key-${i}`;
            className = 'black-btn';
            break;
        }
      } else {
        className = 'themed-button';
        keyClassName = `tick key-${i}`;
      }

      if (wrongGuesses.includes(i)) {
        console.log(`\tis wrong`);
        if (inputType == 'keyboard') {
          keyClassName = keyClassName + ' loser';
        } else {
          className = className + ' loser';
        }
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
    // console.log('inputType will be:');
    // console.log(inputType);
    switch (inputType) {
      case 'circlefifths':
        parentClass = 'child input-container circleOfFifths';
        childClass = 'circle';
        label = 'Circle of Fifths';
        break;
      case 'keyboard':
        parentClass = 'child input-container keyboard-container';
        childClass = 'piano';
        label = 'Keyboard';
        break;
      case 'chromatic':
        parentClass = 'child input-container chromatic-container';
        childClass = 'chromatic';
        label = 'chromatic';
        break;
    }

    return (
      <div className={parentClass}>
        <div className={childClass}>
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
    <>
      {/* <ShowAnswer /> */}
      <SkipButton />
      <ScoreBoard />
      <QuizInput />
      <ImageContainer />
      <QuestionBar />
    </>
  );
}

export default { QuizModule, SettingsMenu };
