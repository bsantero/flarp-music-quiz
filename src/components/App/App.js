import React from 'react';
import conLog from '../../utils/conLog.js';
import { Header } from '../Header/Header.js';
import { Footer } from '../Footer/Footer.js';

import { QuizLeftRight as Quiz1 } from '../Quizzes/QuizLeftRight.js';
import { QuizLeftMidRight as Quiz2 } from '../Quizzes/QuizLeftMidRight.js';

import './App.css';
import './App-testing.css';
import '../../styles/flexbox.css';

// Constants

const DEFAULT_QUIZ_ID = 1;

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
    case 1:
      QuizComponent = Quiz1;
      break;
    case 2:
      QuizComponent = Quiz2;
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

  return (
    <div className="App">
      <Header setCurrentQuiz={setCurrentQuiz} />
      <Main currentQuiz={currentQuiz} />
      <Footer />
    </div>
  );
}

export default App;
