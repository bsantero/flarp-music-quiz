import React from 'react';
import './chromatic.css';

const DEFAULT_CONTAINER_STYLE = 'tick key-';
const DEFAULT_BUTTON_STYLE = 'themed-button';

export function Chromatic({ octaves, currentNote, handleClick, wrongEntries }) {
  function NewButton({ note, containerStyle, buttonStyle }) {
    let name = note;
    if (note[1] == '♮') {
      name = note[0];
    }
    return (
      <div key={note} className={containerStyle}>
        <button className={buttonStyle} onClick={() => handleClick(note)}>
          {name}
        </button>
      </div>
    );
  }

  let buttons = [];

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
    const keyInt = parseInt(key);
    currentNote = value[0];
    // if (value[1] == 'white') {
    containerStyle = `${DEFAULT_CONTAINER_STYLE}${keyInt}`;
    buttonStyle = DEFAULT_BUTTON_STYLE;
    // } else if (value[1] == 'black') {
    // containerStyle = `piano-key black key-${key}`;
    // buttonStyle = 'black-btn';
    // } else {
    // console.log(`Err: Key {${key}} doesn't have white/black value.`);
    // }
    if (wrongEntries.includes(keyInt)) {
      console.log(`\tis wrong`);
      buttonStyle = buttonStyle + ' loser';
    }

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

export default Chromatic;
