import React, { useState } from 'react';
import './circle.css';

const DEFAULT_CONTAINER_STYLE = 'tick key-';
const DEFAULT_BUTTON_STYLE = 'themed-button';

function NewButton({ note, containerStyle, buttonStyle, handleClick }) {
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

export function Circle({
  currentInputSchema,
  currentNote,
  handleClick,
  wrongEntries
}) {
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

  const layout = currentInputSchema.map((i) => {
    // console.log(`building ${i}`);
    // debugger;
    return [i, whiteBlackKeys[i]];
  });
  console.log(layout);

  for (const [key, value] of layout) {
    const keyInt = parseInt(key);
    currentNote = value[0];
    containerStyle = `${DEFAULT_CONTAINER_STYLE}${keyInt}`;
    buttonStyle = DEFAULT_BUTTON_STYLE;
    if (wrongEntries.includes(parseInt(key))) {
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
      />
    );
  }

  return buttons;
}

export default Circle;
