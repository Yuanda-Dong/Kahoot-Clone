import LoginForm from '../components/LoginForm';
import React from 'react';
import { Link } from 'react-router-dom';

function Login () {
  localStorage.setItem('authToken', '');
  return (
    <>
      <nav>
        <Link to="/register">Register</Link> |<Link to="/login">Login</Link>
      </nav>
      <h1>Login</h1>
      <LoginForm />
    </>
  );
}
export default Login;

// {async (email, password) => {
//   const response = await fetch(
//     'http://localhost:5005/admin/auth/login',
//     {
//       method: 'POST',
//       headers: {
//         'Content-type': 'application/json'
//       },
//       body: JSON.stringify({
//         email,
//         password
//       })
//     }
//   );
//   const data = await response.json();
//   localStorage.setItem('authToken', data.token);
//   <Navigate to="/quiz/new" />;
// }}
