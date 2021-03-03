import React, { useState } from 'react';
import './circle.css';
import { enharmonicsToIndex } from '../../utils/Keys';

const DEFAULT_CONTAINER_STYLE = 'tick key-';
const DEFAULT_BUTTON_STYLE = 'themed-button';

function NewButton({ note, containerStyle, buttonStyle, handleClick }) {
  // console.log(note, typeof note);
  // debugger;
  // if (note[1] == '♮') {
  //   name = note[0];
  // }
  // const btn = enharmonicsToIndex[note];

  return (
    <div className={containerStyle}>
      <div className="rotate-fix">
        <button className={buttonStyle} onClick={() => handleClick(note)}>
          {note[1] == '♮' ? note[0] : note}
        </button>
      </div>
    </div>
  );
}

export function Circle({
  currentInputSchema,
  currentAnswer,
  handleClick,
  wrongEntries,
  mode,
  whiteBlackKeys,
  flarpiness,
  setFlarpiness,
  FlirpButton,
  handleFlarpFlip
}) {
  // console.log(currentAnswer);
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

  // console.log('mode:', mode);

  for (const [key, value] of layout) {
    // console.log(key, value);
    const keyInt = parseInt(key);
    containerStyle = `${DEFAULT_CONTAINER_STYLE}${keyInt}`;
    buttonStyle = DEFAULT_BUTTON_STYLE;
    mode == 'major' ? (buttonStyle += ' capitalize') : (buttonStyle += '');
    if (wrongEntries.includes(value)) {
      // if (wrongEntries.includes(parseInt(key))) {
      console.log(`\tis wrong`);
      buttonStyle = buttonStyle + ' loser';
    }

    buttons.push(
      <NewButton
        buttonStyle={buttonStyle}
        containerStyle={containerStyle}
        key={'btn' + value}
        note={value}
        handleClick={handleClick}
        sharpFlatMixed={flarpiness}
        mode={mode}
      />
    );
  }
  buttons.push(
    <FlirpButton
      buttonStyle={buttonStyle}
      handleFlarpFlip={handleFlarpFlip}
      setFlarpiness={setFlarpiness}
    />
  );
  return buttons;
}

export default Circle;
