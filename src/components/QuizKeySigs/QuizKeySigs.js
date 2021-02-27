import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputPanel } from '../InputPanel/InputPanel';
import {
  keyofc,
  chromatic,
  enharmonics,
  defCircleSignatures
} from '../../utils/Keys.js';
import { reorder, capitalizeFirstLetter } from './utils/KeySigUtils';
import './styles/keysigs.css';
import './styles/mediaqueries.css';
import SettingsContainer from '../Settings/Settings';

const random = require('@aspiesoft/random-number-js');

// OPTIONS

const DEFAULT_NEW_GAME = true;
const DEFAULT_ANSWER = { pitch: '0', mode: 'major' };
const DEFAULT_INPUT_TYPE = 'circlefourths';
// [ 'chromatic', 'keyboard', 'circlechromatic', 'circlefifths', 'circlefourths' ]
const DEFAULT_MODE_PREF = 'qualities'; // [qualities: Major | Minor, modes, both,]

const DEFAULT_ROTATE_PREF = 'false';

export function QuizModule(props) {
  // debugger;

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
  const [wrongEntries, updateWrongEntries] = useState([]);
  const [inputType, changeInputType] = useState(DEFAULT_INPUT_TYPE);
  const [userPrefRotate, updatePrefRotate] = useState(DEFAULT_ROTATE_PREF);

  function switchInputType(type) {
    const arr = [
      'chromatic',
      'keyboard',
      'circlechromatic',
      'circlefifths',
      'circlefourths'
    ];
    type
      ? changeInputType(type)
      : changeInputType(arr[arr.indexOf(inputType) + 1]);
  }

  function getNoteData(index, data, weighted = 'default') {
    let newData;
    if (!keySigs[index][weighted][data]) {
      let newPitchObject = keySigs[index];
      let newDefault = newPitchObject[weighted];
      newData = newPitchObject[newDefault][data];
    } else {
      newData = keySigs[index][data];
    }
    // console.log(newData);
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

  function handleClick(entry) {
    console.log(`${entry} entered, expected: ${answerPitch}`);
    const guess = enharmonics[entry];
    console.log(guess);
    const newWrongs = [...wrongEntries];

    // Test the input against the keyId
    if (guess == answerPitch) {
      // Wins
      console.log('Winner!');
      updateScore(score + 1);
      updateWrongEntries([]);
      generateNewQuestion(answerPitch);
    } else {
      // Loses
      console.log("YOU'RE A FAILURE, HARRY");
      updateScore(score - 1);
      newWrongs.push(guess);
      updateWrongEntries(newWrongs);
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

  // ... end JSX Components

  // Main function's Return ...

  return (
    <>
      {/* <ShowAnswer /> */}
      <SettingsContainer
        show={props.show}
        menuSet={props.menuSet}
        QuizOptions={QuizOptions}
        switchInputType={changeInputType}
      />
      <SkipButton />
      <ScoreBoard />
      <InputPanel
        numOctaves={1}
        possibleEntries={12}
        handleClick={handleClick}
        inputType={inputType}
        loading={false}
        wrongEntries={wrongEntries}
        currentNote={answerPitch}
      />
      <ImageContainer />
      <QuestionBar />
    </>
  );
}

export function QuizOptions(props) {
  return (
    <div className="quiz-settings-container input-choices">
      <h1 className="options-header">Input Method</h1>

      <button
        className="quiz-option"
        // disabled
        onClick={() => props.switchInputType('chromatic')}
      >
        Chromatic
      </button>
      <button
        className="quiz-option"
        // disabled
        onClick={() => props.switchInputType('keyboard')}
      >
        Keyboard
      </button>
      <button
        className="quiz-option"
        // disabled
        onClick={() => props.switchInputType('circlechromatic')}
      >
        Chromatic Circle
      </button>
      <button
        className="quiz-option"
        // disabled
        onClick={() => props.switchInputType('circlefourths')}
      >
        Circle of Fourths
      </button>
      <button
        className="quiz-option"
        // disabled
        onClick={() => props.switchInputType('circlefifths')}
      >
        Circle of Fifths
      </button>
    </div>
  );
}

export default { QuizModule, QuizOptions };
