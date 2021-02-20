import React from 'react';
import Navigation from './Navigation';

import logo from './img/logo.png';

export function Header({ setCurrentQuiz }) {
  return (
    <header className="App-header">
      <div className="brand">
        <img src={logo} className="inline App-logo" alt="Flarp logo" />
        <h1 className="inline Logo-title">Flarp!</h1>
      </div>
      <Navigation
        setCurrentQuiz={setCurrentQuiz}
        className="float-top"
        label="Switch"
      />
    </header>
  );
}

export function Footer() {
  return (
    <footer className="App-footer child">
      <p className="credit">
        by <a href="https://github.com/bsantero">BSvdE</a> |{' '}
        <a href="https://github.com/bsantero/flarp-music-quiz">
          Comments, Suggestions?
        </a>
      </p>
      <div className="brand reflection">
        <img src={logo} className="inline App-logo" alt="Flarp logo" />
        <h1 className="inline Logo-title">Flarp!</h1>
      </div>
    </footer>
  );
}

export default { Header, Footer };
