import React, { useState } from 'react';
import './circle.css';
import { enharmonicsToIndex } from '../../utils/Keys';

const DEFAULT_CONTAINER_STYLE = 'tick key-';
const DEFAULT_BUTTON_STYLE = 'themed-button';

const whiteBlackKeys = {
  sharp: {
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
  },
  flat: {
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
  },
  mixed: {
    0: 'c♮',
    1: 'c♯',
    2: 'd♮',
    3: 'e♭',
    4: 'e♮',
    5: 'f♮',
    6: 'f♯',
    7: 'g♮',
    8: 'a♭',
    9: 'a♮',
    10: 'b♭',
    11: 'b♮'
  }
};

function NewButton({
  note,
  containerStyle,
  buttonStyle,
  handleClick,
  sharpFlatMixed
}) {
  // console.log(note, typeof note);
  // debugger;
  // if (note[1] == '♮') {
  //   name = note[0];
  // }
  // const btn = enharmonicsToIndex[note];
  return (
    <div key={note} className={containerStyle}>
      <button className={buttonStyle} onClick={() => handleClick(note)}>
        {note[1] == '♮' ? note[0] : note}
      </button>
    </div>
  );
}

function handleFlarpFlip(setFlarp) {
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

export function Circle({
  currentInputSchema,
  currentAnswer,
  handleClick,
  wrongEntries
}) {
  const [flarpiness, setFlarpiness] = useState('mixed');

  console.log(currentAnswer);
  let buttons = [];

  let currentNote, containerStyle, buttonStyle;

  // flarpiness = currentAnswer.accidental;

  const layout = currentInputSchema.map((i) => {
    // console.log(`building ${i}`);
    // console.log(whiteBlackKeys[flarpiness][i]);
    // debugger;
    return [i, whiteBlackKeys[flarpiness][i]];
  });
  // console.log(layout);

  for (const [key, value] of layout) {
    // console.log(key, value);
    const keyInt = parseInt(key);
    currentNote = value;
    containerStyle = `${DEFAULT_CONTAINER_STYLE}${keyInt}`;
    buttonStyle = DEFAULT_BUTTON_STYLE;
    if (wrongEntries.includes(value)) {
      // if (wrongEntries.includes(parseInt(key))) {
      console.log(`\tis wrong`);
      buttonStyle = buttonStyle + ' loser';
    }

    buttons.push(
      <NewButton
        buttonStyle={buttonStyle}
        containerStyle={containerStyle}
        key={key}
        note={currentNote}
        handleClick={handleClick}
        sharpFlatMixed={flarpiness}
      />
    );
  }
  buttons.push(
    <div key="flarpSwitch" className="flarp-it-up">
      <button
        className={buttonStyle}
        onClick={() => handleFlarpFlip(setFlarpiness)}
      >
        Flirp!
      </button>
    </div>
  );
  return buttons;
}

export default Circle;
