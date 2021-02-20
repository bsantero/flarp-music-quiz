import React from 'react';
import './nav-test.css';

function NavButton(props) {
  return (
    <button onClick={() => props.setCurrentQuiz(props.quiz)}>
      {props.label}
    </button>
  );
}

export function Navigation(props) {
  return (
    <div className="float-top">
      <NavButton setCurrentQuiz={props.setCurrentQuiz} quiz={0} label="Flarp" />
      <NavButton setCurrentQuiz={props.setCurrentQuiz} quiz={1} label="L-R" />
      <NavButton setCurrentQuiz={props.setCurrentQuiz} quiz={2} label="L-M-R" />
      <NavButton
        setCurrentQuiz={props.setCurrentQuiz}
        quiz={3}
        label="Coming Soon!"
      />
    </div>
  );
}

export default Navigation;
