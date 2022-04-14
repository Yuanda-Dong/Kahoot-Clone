import LoginForm from '../components/LoginForm';
import React from 'react';
import { NavTabLogin } from '../components/NavTab';

function Login () {
  localStorage.setItem('authToken', '');
  localStorage.setItem('email', '');
  return (
    <>
      <NavTabLogin />
      <h1>Login</h1>
      <LoginForm />
    </>
  );
}
export default Login;
