import React from 'react';
import conLog from '../../utils/conLog.js';
import { Header } from '../Header/Header.js';
import { Footer } from '../Footer/Footer.js';
import { SettingsMenu } from '../Settings/Settings.js';

import {
  QuizModule as QuizKeySig,
  SettingsMenu as KeySigSettings
} from '../QuizKeySigs/QuizKeySigs.js';
import { QuizModule as QuizLR } from '../QuizLeftRight/QuizLeftRight.js';
import { QuizModule as QuizLMR } from '../QuizLeftMidRight/QuizLeftMidRight.js';

import './App.css';
import './App-testing.css';

// Constants

const DEFAULT_QUIZ_ID = 'KeySig';
const DEFAULT_QUIZ_SETTINGS = KeySigSettings;

function Main({ currentQuiz }) {
  conLog(currentQuiz);

  let QuizComponent = null;

  switch (currentQuiz) {
    case 0:
      QuizComponent = () => (
        <div>
          <h1>Hello.</h1>
        </div>
      );

      break;
    case 'KeySig':
      QuizComponent = QuizKeySig;
      break;
    case 'LR':
      QuizComponent = QuizLR;
      break;
    case 'LMR':
      QuizComponent = QuizLMR;
      break;
    default:
      console.log('Err: no quiz selected.');
      QuizComponent = () => <div>No quiz here, sorry!</div>;
  }

  return (
    <main className="App-main">
      <QuizComponent />
    </main>
  );
}

function App() {
  const [currentQuiz, setCurrentQuiz] = React.useState(DEFAULT_QUIZ_ID);
  const [currentSettings, setCurrentSettings] = React.useState(
    DEFAULT_QUIZ_SETTINGS
  );
  const [settingsState, toggleSettings] = React.useState(false);

  return (
    <div className="App">
      <SettingsMenu
        currentSettings={currentSettings}
        menuState={settingsState}
        menuSet={toggleSettings}
      />
      <Header
        setCurrentQuiz={setCurrentQuiz}
        setCurrentSettings={setCurrentSettings}
        menuState={settingsState}
        menuSet={toggleSettings}
      />
      <Main currentQuiz={currentQuiz} />
      <Footer />
    </div>
  );
}

export default App;
