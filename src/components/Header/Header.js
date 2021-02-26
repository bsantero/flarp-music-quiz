import React from 'react';
import Navigation1 from '../../components/Navigation/Navigation';
import logo from '../../img/logo.png';

export function Header({}) {
  return (
    <header className="App-header">
      <div className="brand">
        <img src={logo} className="inline App-logo" alt="Flarp logo" />
        <h1 className="inline Logo-title">Flarp!</h1>
      </div>
    </header>
  );
}

export default { Header };
