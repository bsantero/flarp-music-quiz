import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import conLog from '../../utils/conLog.js';
import { Header } from '../Header/Header.js';
import { Footer } from '../Footer/Footer.js';
import { NavigationOne } from '../Navigation/Navigation.js';
import {
  QuizModule as QuizKeySig,
  QuizOptions as KeySigOptions
} from '../QuizKeySigs/QuizKeySigs.js';
import { QuizModule as QuizLR } from '../QuizLeftRight/QuizLeftRight.js';
import { QuizModule as QuizLMR } from '../QuizLeftMidRight/QuizLeftMidRight.js';

import './App.css';
import './App-testing.css';

// Constants

const DEFAULT_QUIZ_ID = 'KeySig';
const DEFAULT_QUIZ_OPTIONS = KeySigOptions;

export function View(props) {
  // conLog(currentQuiz);

  let QuizComponent = null;
  let QuizOptions = null;

  switch (props.currentQuiz) {
    case 0:
      QuizComponent = () => (
        <div>
          <h1>Hello.</h1>
        </div>
      );

      break;
    case 'KeySig':
      QuizComponent = QuizKeySig;
      QuizOptions = KeySigOptions;
      // console.log(QuizOptions);
      // debugger;
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
  // console.log();
  // console.log(settingsState, toggleSettings);

  // SettingsContainer.propTypes = {
  //   wtfState: PropTypes.bool,
  //   wtfSet: PropTypes.func,
  //   QuizOptions: PropTypes.func,
  //   newClass: PropTypes.string
  // };

  return (
    <main className="App-main Quiz-main">
      <QuizComponent
        show={props.show}
        menuSet={props.menuSet}
        volume={props.volume}
        setVolume={props.setVolume}
        muted={props.muted}
        setMuted={props.setMuted}
      />
    </main>
  );
}

function App() {
  const initialState = {
    muted: false
  };

  const [currentQuiz, setCurrentQuiz] = React.useState(DEFAULT_QUIZ_ID);
  const [settingsShow, toggleSettings] = React.useState(false);
  const [volume, setVolume] = React.useState(0.2);
  const reducer = (state, action) => ({ ...state, ...action });
  const [state, setState] = useReducer(reducer, initialState);

  // changeSettingsClass(newClass);

  return (
    <div className="App">
      <Header setCurrentQuiz={setCurrentQuiz} />
      <NavigationOne
        setCurrentQuiz={setCurrentQuiz}
        menuState={settingsShow}
        menuSet={toggleSettings}
      />
      <View
        currentQuiz={currentQuiz}
        show={settingsShow}
        menuSet={toggleSettings}
        volume={volume}
        setVolume={setVolume}
        muted={state.muted}
        setMuted={setState}
      />
      <Footer />
    </div>
  );
}

export default App;
