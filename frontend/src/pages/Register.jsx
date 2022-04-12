import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { NavTabLogin } from '../components/NavTab';
function Register () {
  return (
    <>
      <NavTabLogin />
      <h1>Register</h1>
      <RegisterForm />
    </>
  );
}

export default Register;
