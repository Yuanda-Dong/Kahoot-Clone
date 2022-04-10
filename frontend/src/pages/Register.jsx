import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { Navigate } from 'react-router-dom';

function Register () {
  return (
    <>
      <h1>Register</h1>
      <RegisterForm
        submit={async (email, password, name) => {
          const response = await fetch(
            'http://localhost:5005/admin/auth/register',
            {
              method: 'POST',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify({
                email,
                password,
                name
              })
            }
          );
          const data = await response.json();
          localStorage.setItem('token', data.token);
          <Navigate to="/quiz/new" />;
        }}
      />
    </>
  );
}

export default Register;
