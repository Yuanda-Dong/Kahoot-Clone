import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { Link } from 'react-router-dom';

function Register () {
  return (
    <>
      <nav>
        <Link to="/register">Register</Link> |<Link to="/login">Login</Link>
      </nav>
      <h1>Register</h1>
      <RegisterForm />
    </>
  );
}

export default Register;
