import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import QuizNew from './pages/QuizNew';
import QuizEdit from './pages/QuizEdit';

function App () {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* click "copy link", start a game */}
          {/* <Route path="/play/{sessionID}" element={<PlayGame />} /> */}

          {/* show result page */}
          {/* <Route path="/result/{sessionID}" element={<PlayGame />} /> */}

          {/* games, navbar */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* click "create a Quiz" */}
          <Route path="/quiz/new" element={<QuizNew />} />

          {/* click "edit a Quiz", need a quizID in route */}
          <Route path="/quiz/:quizid" element={<QuizEdit />} />

          {/* click "edit a question in a quiz", need a quizID in route */}
          {/* <Route
            path="/quiz $quizID=1 $questionID=123"
            element={<QuizEdit />}
          /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
