import React from 'react';

function NavButton(props) {
  return (
    <button onClick={() => props.setCurrentQuiz(props.quiz)}>
      {props.label}
    </button>
  );
}

export function Navigation(props) {
  return (
    <>
      <div className={props.className}>
        <NavButton
          setCurrentQuiz={props.setCurrentQuiz}
          quiz={0}
          label="Reset"
        />
        <NavButton
          setCurrentQuiz={props.setCurrentQuiz}
          quiz={1}
          label="Quiz 1"
        />
        <NavButton
          setCurrentQuiz={props.setCurrentQuiz}
          quiz={2}
          label="Quiz 2"
        />
        <NavButton
          setCurrentQuiz={props.setCurrentQuiz}
          quiz={3}
          label="Quiz 3"
        />
      </div>
    </>
  );
}

export default Navigation;
