import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import QuizNew from './pages/QuizNew';

function App () {
  return (
    <>
      <BrowserRouter>
        {/* <nav>
          <Link to="/register">Register</Link> |<Link to="/login">Login</Link>
        </nav> */}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* games, navbar */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}

          {/* click "create a Quiz" */}
          <Route path="/quiz/new" element={<QuizNew />} />

          {/* click "edit a Quiz", need a quizID in route */}
          {/* <Route path="/quiz$quizID=1" element={<QuizEdit />} /> */}

          {/* click "edit a question in a quiz", need a quizID in route */}
          {/* <Route path="/quiz $quizID=1 $questionID=123" element={<QuizEdit />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
