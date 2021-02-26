import React from 'react';
import PropTypes from 'prop-types';
import conLog from '../../utils/conLog';

export function SettingsContainer(props) {
  console.log(props);
  const menuOpenStyle = 'settings-main-container float-top overlay';
  let newClass;
  // console.log(wtfState);
  if (props.show == true) {
    // conLog(props.menuState);
    // debugger;
    newClass = menuOpenStyle;
    console.log('Settings open for bidnis.');
  } else if (props.show == false) {
    newClass = menuOpenStyle + ' hidden';
    console.log('Settings lykket.');
  } else {
    // debugger;
    newClass = menuOpenStyle + ' failed';
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
