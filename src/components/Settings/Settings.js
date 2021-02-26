import React from 'react';
import PropTypes from 'prop-types';
import conLog from '../../utils/conLog';

export function SettingsContainer(props) {
  console.log(props);

  let newClass;
  // console.log(wtfState);
  if (props.show == true) {
    // conLog(props.menuState);
    // debugger;
    newClass = 'settings-main-container float-top overlay';
    console.log('Settings open for bidnis.');
  } else if (props.show == false) {
    newClass = 'settings-main-container float-top overlay hidden';
    console.log('Settings lykket.');
  } else {
    // debugger;
    newClass = 'settings-main-container float-top overlay hidden';
    console.log('Settings FAILED.');
  }

  return (
    <div className={newClass}>
      <button className="menu-btn-close" onClick={() => props.menuSet(false)}>
        {'X'}
      </button>
      <props.QuizOptions />
    </div>
  );
}

export default SettingsContainer;
