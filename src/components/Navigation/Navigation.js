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

export function Navigation(props) {
  return (
    <div className="navigation float-top">
      <NavButton setCurrentQuiz={props.setCurrentQuiz} quiz={0} label="Flarp" />{' '}
      <NavButton
        setCurrentQuiz={props.setCurrentQuiz}
        quiz={'KeySig'}
        label="Key Sigs."
      />
      <NavButton
        setCurrentQuiz={props.setCurrentQuiz}
        quiz={'LR'}
        label="L-R"
      />
      <NavButton
        setCurrentQuiz={props.setCurrentQuiz}
        quiz={'LMR'}
        label="L-M-R"
      />
      <NavButton
        setCurrentQuiz={props.setCurrentQuiz}
        quiz={1}
        label="Coming Soon!"
      />
    </div>
  );
}

export default Navigation;
