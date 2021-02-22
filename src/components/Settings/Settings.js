import React from 'react';
import conLog from '../../utils/conLog';

export function SettingsMenu(props) {
  let newClass;
  if (props.menuState == true) {
    conLog(props.menuState);
    newClass = 'float-top overlay';
    console.log('Settings open for bidnis.');
  } else {
    newClass = 'float-top overlay hidden';
    console.log('Settings lykket.');
  }
  return (
    <div className={newClass}>
      <button className="menu-btn-close" onClick={() => props.menuSet(false)}>
        X
      </button>
      <button>future button</button>
    </div>
  );
}

export default SettingsMenu;
