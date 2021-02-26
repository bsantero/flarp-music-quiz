import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export function SettingsContainer(props) {
  const menuOpenStyle = 'settings-main-container float-top overlay';
  let newClass;

  if (props.show == true) {
    // console.log(props);
    // debugger;
    newClass = menuOpenStyle;
    // console.log('Settings open for bidnis.');
  } else if (props.show == false) {
    newClass = menuOpenStyle + ' hidden';
    // console.log('Settings lykket.');
  } else {
    // debugger;
    newClass = menuOpenStyle + ' failed';
    // console.log('Settings FAILED.');
  }

  return (
    <div className={newClass}>
      <button className="menu-btn-close" onClick={() => props.menuSet(false)}>
        {'X'}
      </button>
      <props.QuizOptions
        switchInputType={props.switchInputType}
        changeInputType={props.changeInputType}
      />
    </div>
  );
}

export default SettingsContainer;
