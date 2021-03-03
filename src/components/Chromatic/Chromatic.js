import React from 'react';
import './chromatic.css';
// import { FlirpButton } from '../InputPanel/InputPanel';

const DEFAULT_CONTAINER_STYLE = 'tick key-';
const DEFAULT_BUTTON_STYLE = 'themed-button';

export function Chromatic({
  octaves,
  currentNote,
  handleClick,
  wrongEntries,
  setFlarpiness,
  flarpiness,
  FlirpButton,
  handleFlarpFlip,
  whiteBlackKeys,
  mode
}) {
  function NewButton({ note, containerStyle, buttonStyle }) {
    let name = note;
    if (note[1] == '♮') {
      name = note[0];
    }
    return (
      <div note={note} className={containerStyle}>
        <button className={buttonStyle} onClick={() => handleClick(note)}>
          {name}
        </button>
      </div>
    );
  }

  // console.log('whiteBlackKeys[flarpi..]: ', whiteBlackKeys[flarpiness]);
  // debugger;

  let buttons = [];

  let containerStyle, buttonStyle;
  const whiteBlackKeysOld = {
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

  for (const [key, value] of Object.entries(whiteBlackKeys[flarpiness])) {
    // console.log('key,value: ', key, value);
    // const keyInt = parseInt(key);
    currentNote = value;
    containerStyle = `${DEFAULT_CONTAINER_STYLE}${key}`;
    buttonStyle = DEFAULT_BUTTON_STYLE;
    // console.log(mode);
    mode == 'major' ? (buttonStyle += ' capitalize') : (buttonStyle += '');
    // console.log(buttonStyle);
    // console.log('wrongs: ', wrongEntries);

    if (wrongEntries.includes(value)) {
      console.log(value, 'is wrong');
      buttonStyle = buttonStyle + ' loser';
    }

    buttons.push(
      <NewButton
        buttonStyle={buttonStyle}
        containerStyle={containerStyle}
        key={'key' + key}
        note={currentNote}
      />
    );
  }
  // console.log(buttons);
  buttons.push(
    <FlirpButton
      buttonStyle={buttonStyle}
      handleFlarpFlip={handleFlarpFlip}
      flarpiness={flarpiness}
      setFlarpiness={setFlarpiness}
    />
  );

  return buttons;
}

export default Chromatic;
