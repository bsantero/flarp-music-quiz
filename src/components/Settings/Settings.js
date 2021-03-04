import React from 'react';
import PropTypes from 'prop-types';
import './settings-menu.css';

export function SettingsContainer({
  show,
  menuSet,
  QuizOptions,
  switchInputType,
  changeInputType,
  state,
  setMuted,
  volume,
  setVolume
}) {
  const menuOpenStyle = 'settings-main-container float-top overlay';
  let newClass;

  if (show == true) {
    // console.log(props);
    // debugger;
    newClass = menuOpenStyle;
    // console.log('Settings open for bidnis.');
  } else if (show == false) {
    newClass = menuOpenStyle + ' hidden';
    // console.log('Settings lykket.');
  } else {
    // debugger;
    newClass = menuOpenStyle + ' failed';
    // console.log('Settings FAILED.');
  }

  return (
    <div className={newClass}>
      <button className="menu-btn-close" onClick={() => menuSet(false)}>
        {'X'}
      </button>
      <QuizOptions
        switchInputType={switchInputType}
        changeInputType={changeInputType}
        state={state}
        setMuted={setMuted}
        volume={volume}
        setVolume={setVolume}
      />
    </div>
  );
}

export default SettingsContainer;
