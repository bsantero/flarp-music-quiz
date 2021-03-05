import React, { useReducer } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom';
import { Header } from '../Header/Header.js';
import { Footer } from '../Footer/Footer.js';

import { NavigationOne } from '../Navigation/Navigation.js';
import {
  QuizModule as QuizKeySigs,
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
      QuizComponent = QuizKeySigs;
      QuizOptions = KeySigOptions;
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
    <QuizComponent
      show={props.show}
      menuSet={props.menuSet}
      volume={props.volume}
      setVolume={props.setVolume}
      state={props.state}
      setMuted={props.setMuted}
    />
  );
}

function Home() {
  return (
    <div className="front center">
      <h1>No one home, just us chickens!</h1>
    </div>
  );
}

function App() {
  const initialState = {
    muted: false
  };

  const [currentQuiz, setCurrentQuiz] = React.useState(DEFAULT_QUIZ_ID);
  const [settingsShow, toggleSettings] = React.useState(false);
  const [volume, setVolume] = React.useState(0.8);
  const reducer = (state, action) => ({ ...state, ...action });
  const [state, setState] = useReducer(reducer, initialState);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Header setCurrentQuiz={setCurrentQuiz} />

        <NavigationOne
          // setCurrentQuiz={setCurrentQuiz}
          menuState={settingsShow}
          menuSet={toggleSettings}
        ></NavigationOne>

        <Switch>
          <Route path="/keysignatures">
            <QuizKeySigs
              show={settingsShow}
              menuSet={toggleSettings}
              volume={volume}
              setVolume={setVolume}
              state={state}
              setMuted={setState}
            />
          </Route>
          <Route path="/">
            <QuizKeySigs
              show={settingsShow}
              menuSet={toggleSettings}
              volume={volume}
              setVolume={setVolume}
              state={state}
              setMuted={setState}
            />
            {/* <Home /> */}
          </Route>
        </Switch>

        {/* 
        <View
          currentQuiz={currentQuiz}
          show={settingsShow}
          menuSet={toggleSettings}
          volume={volume}
          setVolume={setVolume}
          state={state}
          setMuted={setState}
        /> */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
