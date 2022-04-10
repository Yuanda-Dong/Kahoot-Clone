import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import QuizNew from './pages/QuizNew';

function App () {
  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to="/register">Register</Link> |<Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quiz/new" element={<QuizNew />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
