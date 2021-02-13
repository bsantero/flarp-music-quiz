// F♯/G♭

import { useState } from 'react';
import './App.css';
import { keySignatures, keyofc, majorKeys, minorKeys } from './Keys';
import './circle.css';

// Constants

const DEFAULT_KEY = 0;
const DEFAULT_MODE = 'major';
const DEFAULT_MODE_ARRAY = 'majorKeys';

// Handy functions

// React Components

// App

function App() {
  const [keyId, updateKeyId] = useState(DEFAULT_KEY);
  const [score, updateScore] = useState(0);
  const [mode, updateMode] = useState(DEFAULT_MODE);
  const [modeArray, updateModeArray] = useState(majorKeys);
  const [imgSrc, updateImgSrc] = useState(keyofc);

  console.log(`\nApp rerendered:`);
  console.log(`\tkeyId: ${keyId}`);
  console.log(`\tscore: ${score}`);
  console.log(`\tmode: ${mode}`);
  console.log(`\timgSrc: ${imgSrc}`);
  // console.log(`\tmodeArray: ${modeArray}`);

  function NoteButton({ note, handleClick }) {
    formatNoteName(note);
    return (
      <div className="tick">
        <div className="label">
          <button
            onClick={function () {
              handleClick(note);
            }}
          >
            {formatNoteName(note)}
          </button>
        </div>
      </div>
    );
  }

  function formatNoteName(note) {
    // console.log(note);
    const noteToFormat = modeArray[note];
    if (note) {
      let accidental = note[1];
      // console.log(accidental);
      if (accidental == 's') {
        return `${note[0]}♯`;
      } else if (accidental == 'f') {
        return `${note[0]}♭`;
      } else return note;
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
    const modeArrayLength = Object.keys(modeArray).length;
    let newKeyId = keyId;
    let newImgSrc = '';

    while (newKeyId === keyId) {
      const rand = Math.floor(Math.random() * Math.floor(modeArrayLength));
      newKeyId = rand;
    }

    const majOrMin = generateQuality();
    console.log(`Your random number is: ${newKeyId} ${majOrMin}`);
    updateKeyId(newKeyId);

    if (majOrMin == 'major') {
      updateMode('major');
      updateModeArray(majorKeys);
      console.log(`\tmajor key:`);
    } else {
      updateMode('minor');
      updateModeArray(minorKeys);
      console.log(`\tminor key:}`);
    }

    let newNoteFromArray = {};

    if (modeArray[newKeyId].uri == 'choose') {
      const sharpOrFlat = generateQuality(true);
      if (sharpOrFlat == 'sharp') {
        console.log('generated a sharp key');
      } else if (sharpOrFlat == 'flat') {
        console.log('generated a flat key');
      } else {
        console.log('Error: no sharp or flat given');
      }
      newNoteFromArray = modeArray[newKeyId][sharpOrFlat];
    } else {
      newNoteFromArray = modeArray[newKeyId];
    }

    console.log(Object.values(newNoteFromArray));

    updateImgSrc(newNoteFromArray.uri);
  }

  function handleSkip() {
    updateScore(score - 5);
    generateNewKey();
  }

  function handleClick(note) {
    const typeOfNote = typeof note;
    const typeOfKeyId = typeof keyId;

    // console.log(
    //   `clicked:\n\t${note}, ${typeOfNote}\nexpected:\n\t${keyId}, ${typeOfKeyId}`
    // );
    if (parseInt(note, 10) === keyId) {
      updateScore(score + 1);
      console.log('Winner! Generating a new key.');
      generateNewKey();
    } else {
      updateScore(score - 1);
      console.log("YOU'RE A FAILURE, HARRY");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h3>What's the {mode.toUpperCase()} Key?</h3>
        </div>
        <div>
          <img src={imgSrc} className="App-logo" alt="logo" />
        </div>
        <div className="circleOfFifths">
          <div className="circle">
            <NoteButton note="0" handleClick={handleClick} />
            <NoteButton note="1" handleClick={handleClick} />
            <NoteButton note="2" handleClick={handleClick} />
            <NoteButton note="3" handleClick={handleClick} />
            <NoteButton note="4" handleClick={handleClick} />
            <NoteButton note="5" handleClick={handleClick} />
            <NoteButton note="6" handleClick={handleClick} />
            <NoteButton note="7" handleClick={handleClick} />
            <NoteButton note="8" handleClick={handleClick} />
            <NoteButton note="9" handleClick={handleClick} />
            <NoteButton note="10" handleClick={handleClick} />
            <NoteButton note="11" handleClick={handleClick} />
            <div>
              <button className="Submit-button" onClick={handleSkip}>
                Skip!
              </button>
            </div>
          </div>
          <div className="score">
            <h5>{score}</h5>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
