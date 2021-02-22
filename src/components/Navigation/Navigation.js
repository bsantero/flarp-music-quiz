import React from 'react';
import './nav-test.css';

function NavButton(props) {
  return (
    <button
      className="themed-button"
      onClick={() => props.setCurrentQuiz(props.quiz)}
    >
      {props.label}
    </button>
  );
}

function MenuButton({ label, menuState, menuSet }) {
  return (
    <button className="themed-button" onClick={() => menuSet(!menuState)}>
      {label}
    </button>
  );
}

export function Navigation(props) {
  return (
    <div className="navigation float-top">
      <NavButton
        setCurrentQuiz={props.setCurrentQuiz}
        quiz={'KeySig'}
        label="Key Signatures"
      />
      <MenuButton
        menuState={props.menuState}
        menuSet={props.menuSet}
        label="Settings"
      />
    </div>
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

export default Navigation;
