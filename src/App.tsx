import { useState } from 'react';
import './App.css';
import { keySignatures, noSig } from './Keys';
import './circle.css';

// math random, index into an array of images

const keySigLen = keySignatures.length;
const initialQuizImg = noSig;
const newQuizImg = undefined;

interface NoteButtonProps {
  readonly note: string;
}

function NoteButton(props: NoteButtonProps): JSX.Element {
  function handleClick() {
    // data.note as argument?
    console.log(`clicked ${props.note}`);
  }

  return (
    <div className="tick">
      <div className="label">
        <button onClick={handleClick}>{props.note}</button>
      </div>
    </div>
  );
}

function App() {
  let [newQuizImg, updateImg] = useState(initialQuizImg);
  function NewImage() {
    const diceRoll = Math.floor(Math.random() * Math.floor(keySigLen));
    console.log(diceRoll);
    newQuizImg = keySignatures[diceRoll].uri;
    updateImg(newQuizImg);
    console.log(newQuizImg);
    return newQuizImg;
  }

  console.log(`There are currently | ${keySigLen} | key signatures.`);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h3>What's the Key?</h3>
        </div>
        <div>
          <img src={newQuizImg} className="App-logo" alt="logo" />
        </div>
        <div className="circleOfFifths">
          <div className="circle">
            <NoteButton note="C" />
            <NoteButton note="G" />
            <NoteButton note="D" />
            <NoteButton note="A" />
            <NoteButton note="E" />
            <NoteButton note="B" />
            <NoteButton note="F#/Gb" />
            <NoteButton note="Db" />
            <NoteButton note="Ab" />
            <NoteButton note="Eb" />
            <NoteButton note="Bb" />
            <NoteButton note="F" />
            <div>
              <button className="Submit-button" onClick={NewImage}>
                Another!
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
