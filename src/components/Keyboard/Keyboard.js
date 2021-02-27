import React from 'react';
import './keyboard.css';

export function Keyboard({ octaves, currentNote, handleClick, wrongEntries }) {
  function NewButton({ note, containerStyle, buttonStyle }) {
    return (
      <div key={note} className={containerStyle}>
        <button
          className={buttonStyle}
          onClick={() => handleClick(note)}
        ></button>
      </div>
    );
  }

  // console.log(props);
  // debugger;
  let buttons = [];

  // 'd♭': 1,
  // 'd♮': 2,
  // 'd♯': 3,

  let containerStyle, buttonStyle;
  const whiteBlackKeys = {
    0: ['c♮', 'white'],
    1: ['c♯', 'black'],
    2: ['d♮', 'white'],
    3: ['d♯', 'black'],
    4: ['e♮', 'white'],
    5: ['f♮', 'white'],
    6: ['f♯', 'black'],
    7: ['g♮', 'white'],
    8: ['g♯', 'black'],
    9: ['a♮', 'white'],
    10: ['a♯', 'black'],
    11: ['b♮', 'white']
  };

  for (const [key, value] of Object.entries(whiteBlackKeys)) {
    // console.log(value[0]);
    // debugger;
    currentNote = value[0];
    if (value[1] == 'white') {
      containerStyle = `piano-key white key-${key}`;
      buttonStyle = 'white-btn';
    } else if (value[1] == 'black') {
      containerStyle = `piano-key black key-${key}`;
      buttonStyle = 'black-btn';
    } else {
      console.log(`Err: Key {${key}} doesn't have white/black value.`);
    }
    if (wrongEntries.includes(parseInt(key))) {
      console.log(`\tis wrong`);
      containerStyle = containerStyle + ' loser';
    }

    // const note = currentNote + octaves;
    // const note = currentNote;

    buttons.push(
      <NewButton
        buttonStyle={buttonStyle}
        containerStyle={containerStyle}
        key={key}
        note={currentNote}
      />
    );
  }

  return buttons;
}

export default Keyboard;
