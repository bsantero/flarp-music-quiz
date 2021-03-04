import React, { useState } from 'react';
import './styles.css';
import { Keyboard } from '../Keyboard/Keyboard';
import { Chromatic } from '../Chromatic/Chromatic';
import { Circle } from '../CircleInput/Circleinput.js';

// function setSchema({ clockwise }) {}

const inputSchemaTypes = {
  chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  cw5ths: [0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5],
  cw4ths: [0, 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7]
};

const whiteBlackKeys = new (function () {
  this.sharp = {
    0: 'c♮',
    1: 'c♯',
    2: 'd♮',
    3: 'd♯',
    4: 'e♮',
    5: 'f♮',
    6: 'f♯',
    7: 'g♮',
    8: 'g♯',
    9: 'a♮',
    10: 'a♯',
    11: 'b♮'
  };
  this.flat = {
    0: 'c♮',
    1: 'd♭',
    2: 'd♮',
    3: 'e♭',
    4: 'e♮',
    5: 'f♮',
    6: 'g♭',
    7: 'g♮',
    8: 'a♭',
    9: 'a♮',
    10: 'b♭',
    11: 'c♭'
  };
})();

function FlirpButton({ buttonStyle, handleFlarpFlip, setFlarpiness }) {
  return (
    <div key="flarpSwitch" className="flarp-it-up">
      <button
        className={buttonStyle}
        onClick={() => {
          handleFlarpFlip(setFlarpiness);
        }}
      >
        Flirp!
      </button>
    </div>
  );
}

export function handleFlarpFlip(setFlarp) {
  // setFlarpiness();
  setFlarp(
    (flarpiness) => {
      const arr = Object.keys(whiteBlackKeys);
      console.log(Object.keys(whiteBlackKeys));
      const nextFlarpiness = arr[arr.indexOf(flarpiness) + 1] || arr[0];
      console.log(`current flarp: ${flarpiness}`);
      console.log(`next flarp: ${nextFlarpiness}`);
      return nextFlarpiness;
    }
    // });
  );
}

export function InputPanel({
  inputType,
  handleClick,
  loading,
  numOctaves,
  currentAnswer,
  wrongEntries,
  mode,
  volume,
  setVolume,
  state
}) {
  const [flarpiness, setFlarpiness] = useState('flat');

  let parentClass;
  let childClass;
  let inputButtons;
  switch (inputType) {
    case 'circlechromatic':
      // console.log(inputSchemaTypes['chromatic']);
      parentClass = 'child input-container circle-container';
      childClass = 'circle';
      inputButtons = (
        <Circle
          key="inputcr"
          clockwise="chromatic"
          currentInputSchema={inputSchemaTypes['chromatic']}
          octaves={numOctaves}
          currentAnswer={currentAnswer}
          wrongEntries={wrongEntries}
          handleClick={handleClick}
          mode={mode}
          whiteBlackKeys={whiteBlackKeys}
          FlirpButton={FlirpButton}
          handleFlarpFlip={handleFlarpFlip}
          flarpiness={flarpiness}
          setFlarpiness={setFlarpiness}
        />
      );
      break;
    case 'circlefourths':
      // console.log(inputSchemaTypes['cw4ths']);
      parentClass = 'child input-container circle-container';
      childClass = 'circle';
      inputButtons = (
        <Circle
          key="inputc4"
          clockwise="cw4ths"
          currentInputSchema={inputSchemaTypes['cw4ths']}
          octaves={numOctaves}
          currentAnswer={currentAnswer}
          wrongEntries={wrongEntries}
          handleClick={handleClick}
          mode={mode}
          whiteBlackKeys={whiteBlackKeys}
          handleFlarpFlip={handleFlarpFlip}
          FlirpButton={FlirpButton}
          flarpiness={flarpiness}
          setFlarpiness={setFlarpiness}
        />
      );
      break;
    case 'circlefifths':
      // console.log(inputSchemaTypes['cw5ths']);
      parentClass = 'child input-container circle-container';
      childClass = 'circle';
      inputButtons = (
        <Circle
          key="inputc5"
          clockwise="cw5ths"
          currentInputSchema={inputSchemaTypes['cw5ths']}
          octaves={numOctaves}
          currentAnswer={currentAnswer}
          wrongEntries={wrongEntries}
          handleClick={handleClick}
          mode={mode}
          whiteBlackKeys={whiteBlackKeys}
          FlirpButton={FlirpButton}
          handleFlarpFlip={handleFlarpFlip}
          flarpiness={flarpiness}
          setFlarpiness={setFlarpiness}
        />
      );
      break;
    case 'keyboard':
      parentClass = 'child input-container keyboard-container';
      childClass = 'piano';
      inputButtons = (
        <>
          <Keyboard
            key="inputpno"
            octaves={numOctaves}
            currentNote={currentAnswer}
            handleClick={handleClick}
            volume={volume}
            setVolume={setVolume}
            wrongEntries={wrongEntries}
            state={state}
          />
        </>
      );
      // console.log(inputButtons);
      break;
    case 'chromatic':
      parentClass = 'child input-container chromatic-container';
      childClass = 'chromatic';
      inputButtons = (
        <Chromatic
          key="inputrowc"
          octaves={numOctaves}
          currentNote={currentAnswer}
          handleClick={handleClick}
          FlirpButton={FlirpButton}
          handleFlarpFlip={handleFlarpFlip}
          wrongEntries={wrongEntries}
          flarpiness={flarpiness}
          setFlarpiness={setFlarpiness}
          currentInputSchema={inputSchemaTypes['chromatic']}
          whiteBlackKeys={whiteBlackKeys}
          mode={mode}
        />
      );
      break;
    default:
      return <span>No input defined.</span>;
  }

  return loading ? (
    'Loading...'
  ) : (
    <div className={parentClass}>
      <div className={childClass}>{inputButtons}</div>
    </div>
  );
}

export default { InputPanel, FlirpButton };
