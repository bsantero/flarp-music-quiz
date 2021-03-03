import React, { useState, CheckBox, useEffect } from 'react';
// import { CheckBox } from 'react';
import './keyboard.css';
import useSound from 'use-sound';
// import {Howl} from 'howler';
import c2toc4obj from './sounds/oneoctave.json';
import oneoctavemp3 from './sounds/oneoctave.mp3';

const whiteBlackKeys = {
  0: ['c♮', 'white', '0200'],
  1: ['c♯', 'black', '0201'],
  2: ['d♮', 'white', '0202'],
  3: ['d♯', 'black', '0203'],
  4: ['e♮', 'white', '0204'],
  5: ['f♮', 'white', '0205'],
  6: ['f♯', 'black', '0206'],
  7: ['g♮', 'white', '0207'],
  8: ['g♯', 'black', '0208'],
  9: ['a♮', 'white', '0209'],
  10: ['a♯', 'black', '0210'],
  11: ['b♮', 'white', '0211']
};

const urls = c2toc4obj.urls[0];
const sprite = c2toc4obj.sprite;
const spriteIndexes = Object.keys(sprite);

export function Keyboard({
  octaves,
  currentNote,
  handleClick,
  wrongEntries,
  volume,
  setVolume
}) {
  const [checked, setChecked] = useState(false);
  const [play] = useSound(oneoctavemp3, { sprite: sprite, volume: volume });
  // const [playc] = useSound(piano0300);

  const handleKeyPress = (sound, note) => {
    // console.log('should play:', sound, typeof sound);
    play({ id: sound });
    console.log(sound, 'has played');
    handleClick(note);
  };

  console.log(`Sprite from oneoctave.mp3 loaded with volume -${volume}-`);

  const toggle = () => {
    setChecked(!checked);
  };
  // let wait = 300;

  // useEffect(() => {
  //   // spriteIndexes.forEach((element, index) => {
  //   //   setTimeout(() => {
  //   //     console.log('testing:', element);
  //   //     play(element);
  //   //   }, wait * index + wait);
  //   // });
  // });

  function NewButton({ note, containerStyle, buttonStyle, sound }) {
    return (
      <div key={note} className={containerStyle}>
        <button
          className={buttonStyle}
          onClick={() => handleKeyPress(sound, note)}
        ></button>
      </div>
    );
  }

  let buttons = [];

  let containerStyle, buttonStyle;

  // console.log(spriteIndexes);

  // const keysWithSounds = whiteBlackKeys.map((key, value) =>
  //   Map.set(key, value.push(spriteIndexes[key]))
  // );
  // console.log(keysWithSounds);

  for (const [key, value] of Object.entries(whiteBlackKeys)) {
    currentNote = value[0];
    const soundFX = 'piano' + value[2];
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
      console.log(value[0], 'is wrong');
      containerStyle = containerStyle + ' loser';
    }

    buttons.push(
      <NewButton
        buttonStyle={buttonStyle}
        containerStyle={containerStyle}
        key={key}
        note={currentNote}
        sound={spriteIndexes[key]}
      />
    );
  }

  return buttons;
}

export default Keyboard;
