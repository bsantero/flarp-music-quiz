import React from 'react';
import Navigation from '../../components/Navigation/Navigation';
import logo from '../../img/logo.png';

export function Header({
  setCurrentQuiz,
  menuState,
  menuSet,
  setCurrentSettings
}) {
  return (
    <header className="App-header">
      <div className="brand">
        <img src={logo} className="inline App-logo" alt="Flarp logo" />
        <h1 className="inline Logo-title">Flarp!</h1>
      </div>
      <Navigation
        setCurrentQuiz={setCurrentQuiz}
        setCurrentSettings={setCurrentSettings}
        menuState={menuState}
        menuSet={menuSet}
      />
    </header>
  );
}

export default { Header };
