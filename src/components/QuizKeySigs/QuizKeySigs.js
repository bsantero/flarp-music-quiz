import React, { useState } from 'react';
import {
  keyofc,
  keySigUris,
  defCircleSignatures,
  sharpCircleSignatures,
  flatCircleSignatures
} from '../../utils/Keys.js';
import conLog from '../../utils/conLog.js';
import './styles/style.css';
import './styles/circle.css';
import './styles/mediaqueries.css';

const DEFAULT_MODE = 'major';
const DEFAULT_MODE_ARRAY = 'majorKeys';
const DEFAULT_KEY = 11;

// Handy functions

// React Components

// App

export function QuizModule() {
  const [keyId, updateKeyId] = useState(DEFAULT_KEY);
  const [score, updateScore] = useState(0);
  const [mode, updateMode] = useState(DEFAULT_MODE);
  // const [keySigs, updateKeySigs] = useState(defCircleSignatures);
  const [imgSrc, updateImgSrc] = useState(keyofc);
  const [sharpOrFlat, updateSharpOrFlat] = useState('default');
  const [wrongGuesses, updateWrongGuesses] = useState([]);

  const keySigs = defCircleSignatures;

  // console.log(`\nApp rerendered:`);
  // console.log(`\tkeyId: ${keyId}`);
  // console.log(`\tscore: ${score}`);
  // console.log(`\tmode: ${mode}`);

  function formatNoteName(index) {
    const noteToFormat = keySigs[index];
    // console.log(noteToFormat);
    if (noteToFormat) {
      let accidental = noteToFormat[2];
      if (accidental == 's') {
        return `${noteToFormat[0]}♯`;
      } else if (accidental == 'f') {
        return `${noteToFormat[0]}♭`;
      } else return noteToFormat;
    }
  }

  function QuestionQuality(qual) {
    if (qual == 'major') {
      return <b className="capitalize">{mode}</b>;
    } else {
      return <b>{mode}</b>;
    }
  }

  function generateQuality(accidental) {
    let first = 'major';
    let second = 'minor';
    if (accidental) {
      first = 'sharp';
      second = 'flat';
    } else {
      first = 'major';
      second = 'minor';
    }
    return Math.random() >= 0.5 ? first : second;
  }

  function generateNewKey() {
    console.log('Winner! Generating a new key.');
    const modeArrayLength = Object.keys(keySigs).length;
    let newKeyId = keyId;
    let newImgSrc = '';

    while (newKeyId === keyId) {
      const rand = Math.floor(Math.random() * Math.floor(modeArrayLength));
      newKeyId = rand;
    }

    const majOrMin = generateQuality(mode);
    // console.log(`Your random number is: ${newKeyId} ${majOrMin}`);
    updateKeyId(newKeyId);

    // if (majOrMin == 'major') {
    //   updateMode('major');
    //   updateKeySigs(majorKeys);
    //   console.log(`\tmajor key:`);
    // } else {
    //   updateMode('minor');
    //   updateKeySigs(minorKeys);
    //   console.log(`\tminor key:}`);
    // }

    let newNoteFromArray = {};

    if (keySigs[newKeyId].uri == 'choose') {
      const newSharpOrFlat = generateQuality(true);
      if (newSharpOrFlat == 'sharp') {
        console.log('generated a sharp key');
      } else if (newSharpOrFlat == 'flat') {
        console.log('generated a flat key');
      } else {
        console.log('Error: no sharp or flat given');
      }
      updateSharpOrFlat(newSharpOrFlat);
      newNoteFromArray = keySigs[newKeyId][newSharpOrFlat];
    } else {
      newNoteFromArray = keySigs[newKeyId];
    }

    // console.log(Object.values(newNoteFromArray));

    updateImgSrc(newNoteFromArray.uri);
  }

  function handleSkip() {
    updateScore(score - 5);
    generateNewKey();
  }

  function isCorrect() {
    console.log('this button was clicked');
  }

  // JSX Components ...

  function QuestionBar() {
    return (
      <div className="child Question-bar">
        <h3 className="question">
          What's the <QuestionQuality /> Key?
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

  function handleClick(props) {
    console.log('Button pressed');
    console.log(props);
    const btn = props.btnKey;
    const newWrongs = [...wrongGuesses];

    // Test the input against the keyId
    if (btn === keyId) {
      // Wins
      console.log('Winner!');
      updateScore(score + 1);
      updateWrongGuesses([]);
      generateNewKey();
    } else {
      // Loses
      console.log("YOU'RE A FAILURE, HARRY");
      updateScore(score - 1);
      newWrongs.push(btn);
      updateWrongGuesses(newWrongs);
    }
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
    console.log(keySigs);
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
