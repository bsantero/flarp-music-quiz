import React from 'react';
import './nav-test.css';

function NavButton(props) {
  return (
    <div className="btn-wrapper nav-btn">
      <button
        className="nav-button"
        onClick={() => props.setCurrentQuiz(props.quiz)}
      >
        {props.label}
      </button>
    </div>
  );
}

function MenuButton({ label, menuState, menuSet }) {
  // console.log(`MenuButton created`);
  // console.log(menuState);
  // console.log(menuSet);
  return (
    <div className="btn-wrapper settings">
      <button
        alt="settings"
        className="settings-button"
        onClick={() => menuSet(!menuState)}
      >
        {label}
      </button>
    </div>
  );
}

export function NavigationOne({ setCurrentQuiz, menuState, menuSet }) {
  return (
    <div className="navigation float-top">
      <NavButton
        setCurrentQuiz={setCurrentQuiz}
        quiz={'KeySig'}
        label="Key Signatures"
      />
      <MenuButton menuState={menuState} menuSet={menuSet} label="⚙️" />
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

export default NavigationOne;
