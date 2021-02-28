import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputPanel } from '../InputPanel/InputPanel';
import {
  chromatic,
  modeTransposition,
  accidentalKeys,
  majorKeysAvoid,
  minorKeysAvoid,
  enharmonics
} from '../../utils/Keys.js';
import { reorder, capitalizeFirstLetter } from './utils/KeySigUtils';
import './styles/keysigs.css';
import './styles/mediaqueries.css';
import SettingsContainer from '../Settings/Settings';

const random = require('@aspiesoft/random-number-js');

// OPTIONS

const DEFAULT_NEW_GAME = true;
const DEFAULT_ANSWER = {
  pitch: 0,
  pitchName: 'c♮',
  mode: 'major',
  accidental: 'mixed'
};
const DEFAULT_INPUT_TYPE = 'circlefifths';
// [ 'chromatic', 'keyboard', 'circlechromatic', 'circlefifths', 'circlefourths' ]
const DEFAULT_ROTATE_PREF = 'false';
const DEFAULT_MODE_PREF = 'qualities'; // [qualities, modes, both,]
const singleenharmonics = enharmonics.list;
const enharmonicsToIndex = enharmonics.enhToInd;
const enharmonicsFromIndex = enharmonics.indToEnh;

// {
//     0: ['c♮', 'b♯'],
//     1: ['c♯', 'd♭'],
//     2: ['d♮'],
//     3: ['e♭', 'd♯'],
//     4: ['e♮', 'f♭'],
//     5: ['e♯', 'f♮'],
//     6: ['f♯', 'g♭'],
//     7: ['g♮'],
//     8: ['g♯', 'a♭'],
//     9: ['a♮'],
//     10: ['a♯', 'b♭'],
//     11: ['b♮', 'c♭']
// }

const PITCH_OPTIONS = {
  major: singleenharmonics.filter((note) => !majorKeysAvoid.includes(note)),
  minor: singleenharmonics.filter((note) => !minorKeysAvoid.includes(note))
};
// console.log(PITCH_OPTIONS.major);
// console.log(PITCH_OPTIONS.minor);
const MODE_OPTIONS = {
  qualities: ['major', 'minor'],
  modes: {
    Ionian: 'major',
    Dorian: 'minor',
    Phrygian: 'minor',
    Lydian: 'major',
    Mixolydian: 'major',
    Aeolian: 'minor',
    Locrian: 'minor'
  },
  both: [
    'major',
    'minor',
    'Ionian',
    'Dorian',
    'Phrygian',
    'Lydian',
    'Mixolydian',
    'Aeolian',
    'Locrian'
  ]
};
const INPUT_OPTIONS = [
  'chromatic',
  'keyboard',
  'circlechromatic',
  'circlefifths',
  'circlefourths'
];

export function QuizModule(props) {
  const [generated, updateGenerated] = useState(!DEFAULT_NEW_GAME);
  const [score, updateScore] = useState(0);
  const [keySigs, updateKeySigs] = useState(chromatic);
  const [answerPitch, setAnswer] = useState(DEFAULT_ANSWER);
  // const [answerMode, setAnswerMode] = useState(DEFAULT_ANSWER.mode);
  const [imgSrc, updateImgSrc] = useState(
    getNoteData(DEFAULT_ANSWER.pitch, 'uri')
  );
  const [accidental, updateAccidental] = useState('default');
  const [modePref, updateModePref] = useState(DEFAULT_MODE_PREF);
  const [wrongEntries, updateWrongEntries] = useState([]);
  const [inputType, changeInputType] = useState(DEFAULT_INPUT_TYPE);
  const [userPrefRotate, updatePrefRotate] = useState(DEFAULT_ROTATE_PREF);
  const [gameHistory, updateGameHistory] = useState([DEFAULT_ANSWER]);

  // console.log(answerPitch);
  // console.log(gameHistory);
  // console.log(gameHistory[gameHistory.length - 1]);
  // debugger;

  function setNewAnswer(ans) {
    setAnswer(ans);
    console.log(ans);
  }

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

  function generateNewNote() {
    const modeOptions = MODE_OPTIONS[modePref];
    console.log(`can generate out of {${modeOptions}} mode options.`);
    const mode = modeOptions[random(0, modeOptions.length - 1)];
    const pitchOptions = PITCH_OPTIONS[mode];
    const base =
      enharmonicsToIndex[pitchOptions[random(0, pitchOptions.length)]];
    // console.log('base, ' + base);
    // console.log('mode, ' + modeTransposition[mode]);
    // console.log(modeTransposition);
    let pitch = base + modeTransposition[mode];
    // console.log(pitch);
    // debugger;
    if (pitch > 11) {
      pitch = pitch - 12;
    }
    console.log(`pitch: ${pitch}`);
    const pitchName = (function () {
      const pitches = enharmonicsFromIndex[pitch];
      console.log(pitches);
      console.log(pitchOptions);
      const val = pitches.isArray
        ? pitchOptions.includes(pitches[0])
          ? pitches[0]
          : pitches[1]
        : pitches[0];
      return val;
    })();
    console.log(pitchName);
    updateImgSrc();
    const newAnswer = {
      uri: base,
      pitch: pitch,
      pitchName: pitchName,
      mode: mode,
      accidental: accidentalKeys(pitchName)
    };
    console.log(newAnswer);
    setAnswer(newAnswer);
    // debugger;
  }
  // function generateNewQuestion(oldAnswer) {
  //   console.log('Generating a new key.');
  //   const keySigsLength = Object.keys(keySigs).length;
  //   let newAnswer = oldAnswer;
  //   let newImgSrc = '';

  //   while (newAnswer === oldAnswer) {
  //     newAnswer = random(0, 11);
  //     console.log(`Old: ${oldAnswer}. New: ${newAnswer}`);
  //   }
  //   let modeRandomInt = null;
  //   let newMode = null;
  //   // generate new Mode
  //   switch (modePref) {
  //     case 'both':
  //       modeRandomInt = random(0, 8);
  //       console.log("Mode was then generated as 'both'.");
  //       break;
  //     case 'modes':
  //       console.log("Mode was generated as 'only modes'.");
  //       if (!modeRandomInt) {
  //         modeRandomInt = random(0, 6);
  //       }
  //       // newMode set to 'only modes'
  //       switch (modeRandomInt) {
  //         case 0:
  //           newMode = 'Ionian';
  //         case 1:
  //           newMode = 'Dorian';
  //         case 2:
  //           newMode = 'Phrygian';
  //         case 3:
  //           newMode = 'Lydian';
  //         case 4:
  //           newMode = 'Mixolydian';
  //         case 5:
  //           newMode = 'Aeolian';
  //         case 6:
  //           newMode = 'Locrian';
  //         case 7:
  //           newMode = 'minor';
  //         case 8:
  //           newMode = 'Major';
  //       }
  //       break;
  //     // newMode set to 'all modes + m/m'
  //     case 'qualities':
  //       if (!modeRandomInt) {
  //         modeRandomInt = random(0, 8);
  //       }
  //       console.log(`Mode was generated as 'Major/Minor'.${modeRandomInt}`);
  //       newMode = modeRandomInt % 2 == 0 ? 'major' : 'minor';
  //       console.log(`Mode was changed.${newMode}`);
  //       break;
  //     default:
  //       console.log("Mode was generated as 'Major/Minor' (default).");
  //   }

  //   setAnswerPitch(newAnswer);
  //   setAnswerMode(newMode);
  //   updateImgSrc(getNoteData(newAnswer, 'uri'));
  //   console.log('newAnswer and Mode are:');
  //   console.log(newAnswer);
  //   // console.log(newMode);
  // }

  function handleSkip() {
    updateScore(score - 1);
  }

  function handleClick(entry, oldAnswer) {
    console.log(entry, typeof entry);
    const guess = enharmonicsToIndex[entry];
    console.log(`${guess} entered, expected: ${answerPitch.pitch}`);
    const newWrongs = [...wrongEntries];

    // Test the input against the keyId
    if (guess == answerPitch.pitch) {
      // Wins
      console.log('Winner!');
      updateScore(score + 1);
      updateWrongEntries([]);
      updateGameHistory((...gameHistory) =>
        Object.assign({}, gameHistory, { [gameHistory.length]: answerPitch })
      );
      // generateNewQuestion(answerPitch);
      generateNewNote(gameHistory, modePref, updateGameHistory);
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
          What's this key in <QuestionQuality quality={answerPitch.mode} />?
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
        currentAnswer={answerPitch}
        userRotate={userPrefRotate}
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
