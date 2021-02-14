// F♯/G♭

import { useState } from 'react';
import './App.css';
import { keySignatures, keyofc, majorKeys, minorKeys } from './Keys';
import './circle.css';
import './mediaqueries.css';
import logo from './img/logo.png';

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
  const [sharpOrFlat, updateSharpOrFlat] = useState('sharp');

  console.log(`\nApp rerendered:`);
  console.log(`\tkeyId: ${keyId}`);
  console.log(`\tscore: ${score}`);
  console.log(`\tmode: ${mode}`);
  // console.log(`\timgSrc: ${imgSrc}`);
  // console.log(`\tmodeArray: ${modeArray}`);

  function formatNoteName(index) {
    const noteToFormat = modeArray[index];
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

  function NoteButton({ note, handleClick }) {
    let noteLabel = '';

    const i = parseInt(note, 10);

    console.log(i);

    if (modeArray[i].uri == 'choose') {
      noteLabel = modeArray[i][sharpOrFlat].label;
    } else {
      noteLabel = modeArray[i].label;
    }
    console.log(noteLabel);

    return (
      <div className="tick">
        <div className="label">
          <button
            onClick={function () {
              handleClick(note);
            }}
          >
            {noteLabel}
          </button>
        </div>
      </div>
    );
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
    // console.log(`Your random number is: ${newKeyId} ${majOrMin}`);
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
      const newSharpOrFlat = generateQuality(true);
      if (newSharpOrFlat == 'sharp') {
        console.log('generated a sharp key');
      } else if (newSharpOrFlat == 'flat') {
        console.log('generated a flat key');
      } else {
        console.log('Error: no sharp or flat given');
      }
      updateSharpOrFlat(newSharpOrFlat);
      newNoteFromArray = modeArray[newKeyId][newSharpOrFlat];
    } else {
      newNoteFromArray = modeArray[newKeyId];
    }

    // console.log(Object.values(newNoteFromArray));

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
      <div className="Title-bar">
        <img src={logo} className="inline Logo"></img>
        <h1 className="inline Logo-title">Flarp!</h1>
      </div>
      <header className="App-header">
        <div className="child Question-bar">
          <h3>What's the {mode.toUpperCase()} Key?</h3>
        </div>
        <div className="child image-container">
          <img src={imgSrc} className="App-logo" alt="logo" />
          <button className="Skip-button" onClick={handleSkip}>
            Skip!
          </button>
        </div>
        <div className="child circleOfFifths">
          <div className="Score">
            <h5>{score}</h5>
          </div>
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
          </div>
        </div>
        <div className="Footer-bar">
          <img src={logo} className="inline Logo"></img>
          <h1 className="inline Logo-title">Flarp!</h1>
        </div>
        <div className="credit-container">
          <p className="credit">
            by{' '}
            <a href="https://github.com/bsantero">
              Brian Santero von der Embse
            </a>
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;
