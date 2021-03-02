import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputPanel } from '../InputPanel/InputPanel';
import {
  keyofc,
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
  base: 0,
  pitch: 0,
  pitchName: 'c♮', // ♭, ♮, ♯
  mode: 'major',
  accidental: 'flat',
  uri: keyofc
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

const SHARP_KEYS = {
  major: ['g♮', 'd♮', 'a♮', 'e♮', 'b♮', 'f♯', 'c♯'],
  minor: ['e♮', 'b♮', 'f♯', 'c♯', 'g♯', 'd♯', 'a♯']
}; //♭, ♮, ♯
const FLAT_KEYS = {
  major: ['f♮', 'b♭', 'e♭', 'a♭', 'd♭', 'g♭', 'c♭'],
  minor: ['d♮', 'g♮', 'c♮', 'f♮', 'b♭', 'e♭', 'a♭']
}; //♭, ♮, ♯

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
  // const [imgSrc, updateImgSrc] = useState(
  //   getNoteData(DEFAULT_ANSWER.base, 'uri')
  // );
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

  function getNoteData(
    index,
    query,
    noteName = null,
    flarpiness,
    mode = DEFAULT_ANSWER.mode,
    lookat = 'default'
  ) {
    noteName
      ? console.log(`noteName entered as: {${noteName}}`)
      : console.log('noteName is null');
    console.log(index, query, flarpiness, mode);
    const baseNote = keySigs[index];
    // const pointer = keySigs[index][lookat];

    // console.log('before: baseNote[sharp]:', baseNote['sharp']);
    // console.log('before: baseNote[flat]:', baseNote['flat']);
    // console.log(noteName[1]);

    let flarp;
    if (baseNote['default'] == 'flarp') {
      console.log('pointer was flarp');
      if (SHARP_KEYS[mode].includes(noteName)) {
        flarp = baseNote['sharp'][query][mode];
      } else if (FLAT_KEYS[mode].includes(noteName)) {
        flarp = baseNote['flat'][query][mode];
      }
    } else {
      console.log('pointer was not flarp');
      const pointer = baseNote['default'];
      flarp = baseNote[pointer][query][mode];
    }

    console.log(flarp);
    // console.log('Pointer is now:', pointer.toString());
    // console.log('pointer:query', pointer[query]);
    // console.log('uri:', pointer[query][mode]);

    // debugger;
    // const flarp =
    //   pointer == 'sharp' || pointer == 'flat'
    //     ? baseNote[pointer][query][mode]
    //     : baseNote[baseNote[pointer]][query][mode];
    // console.log(flarp);

    return flarp;
  }

  function generateNewNote() {
    const modeOptions = MODE_OPTIONS[modePref];
    console.log(`can generate out of ${modeOptions} mode options.`);
    const mode = modeOptions[random(0, modeOptions.length - 1)];
    const pitchOptions = PITCH_OPTIONS[mode];
    let locked = true;
    let rand;
    while (locked) {
      rand = pitchOptions[random(0, pitchOptions.length)];
      console.log('got random:', rand);
      // debugger;
      pitchOptions.includes(rand) ? (locked = false) : (locked = true);
    }

    const pitchName = rand;

    // const pitchName = 'd♮'; // debug a single note after win
    const offset = 12 - modeTransposition[mode];
    console.log('transposing', offset);
    //  enharmonicsToIndex[];

    // console.log('base:', base);
    // console.log('mode, ' + modeTransposition[mode]);
    const pitch = enharmonicsToIndex[pitchName];
    const base = pitch + offset < 11 ? pitch + offset : pitch - 12 + offset;
    console.log('base, pitch', base, pitch);
    // debugger;
    // if (pitch > 11) {
    //   pitch = pitch - 12;
    // }
    console.log(`pitch: ${pitch}`);
    console.log('pitchName is:', pitchName);
    const flarpiness = accidentalKeys(pitchName);
    const newAnswer = {
      base: base,
      pitch: pitch,
      pitchName: pitchName,
      mode: mode,
      flarpiness: accidentalKeys(pitchName),
      uri: getNoteData(pitch, 'uri', pitchName, flarpiness, mode)
    };
    console.log(newAnswer);
    setAnswer(newAnswer);
    // debugger;
  }

  function handleSkip() {
    updateScore(score - 1);
  }

  function handleClick(entry, oldAnswer) {
    // console.log(entry, typeof entry);
    console.log(inputType);
    let answer;
    if (inputType == 'keyboard') {
      answer = enharmonicsToIndex[answerPitch.pitchName];
      entry = enharmonicsToIndex[entry];
    } else {
      answer = answerPitch.pitchName;
    }
    console.log(`${entry} entered, expected: ${answerPitch.pitchName}`);
    const newWrongs = [...wrongEntries];

    // Test the input against the current pitch
    if (entry == answer) {
      // Wins
      console.log('Winner!');
      updateScore(score + 1);
      updateWrongEntries([]);
      updateGameHistory((...gameHistory) =>
        Object.assign({}, gameHistory, { [gameHistory.length]: answerPitch })
      );
      generateNewNote(gameHistory, modePref, updateGameHistory);
    } else {
      // Loses
      console.log("YOU'RE A FAILURE, HARRY");
      updateScore(score - 1);
      newWrongs.push(entry);
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

  function ImageContainer({ debug }) {
    return (
      <div className="child image-container">
        <span className={debug ? 'debug' : 'debug hidden'}>
          {answerPitch.pitchName}
        </span>
        <img src={answerPitch.uri} className="key-img" alt="logo" />
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
        mode={answerPitch.mode}
      />
      <ImageContainer debug={false} />
      <QuestionBar />
    </>
  );
}

export function QuizOptions(props) {
  return (
    <>
      <div className="options-box accessibility-choices">
        <h1 className="options-header">Accessibility</h1>

        <button
          className="quiz-option"
          disabled
          onClick={() => console.log('toggle-motion-pref')}
        >
          Motion
        </button>
      </div>
      <div className="options-box input-choices">
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
    </>
  );
}

export default { QuizModule, QuizOptions };
