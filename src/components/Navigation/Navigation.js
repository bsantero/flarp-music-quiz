import React from 'react';
import { BrowserRouter as Router, Switch, Link } from 'react-router-dom';

function NavButton({ label, href }) {
  return (
    <span className="btn-wrapper nav-btn">
      <Link to={href}>{label}</Link>
    </span>
  );
}

function MenuButton({ label, menuState, menuSet }) {
  // console.log(`MenuButton created`);
  // console.log(menuState);
  // console.log(menuSet);
  return (
    <span className="btn-wrapper settings">
      <button
        alt="settings"
        className="settings-button"
        onClick={() => menuSet(!menuState)}
      >
        {label}
      </button>
    </span>
  );
}

export function NavigationOne({ menuState, menuSet }) {
  return (
    <>
      <span className="navigation navbuttons">
        {/* <NavButton label={'Home'} href={'/'} /> */}
        <NavButton label={'Key Signatures'} href={'/keysignatures'} />
      </span>
      <MenuButton menuState={menuState} menuSet={menuSet} label="⚙️" />
    </>
  );
}

//   <NavButton setCurrentQuiz={props.setCurrentQuiz} quiz={0} label="Flarp" />{' '} */

// { </div>  <NavButton
//   setCurrentQuiz={props.setCurrentQuiz}
//   quiz={'LR'}
//   label="L-R"
// />
// <NavButton
//   setCurrentQuiz={props.setCurrentQuiz}
//   quiz={'LMR'}
//   label="L-M-R"
// />
// <NavButton
//   setCurrentQuiz={props.setCurrentQuiz}
//   quiz={1}
//   label="Coming Soon!" }
// />

export default NavigationOne;
