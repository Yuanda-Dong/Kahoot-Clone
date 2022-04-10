import React from 'react';
import PropTypes from 'prop-types';
function RegisterForm ({ submit }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  const onSubmit = () => {
    submit(email, password, name);
  };

  return (
    <>
      Email:
      <input type="text" onChange={(e) => setEmail(e.target.value)} />
      <br />
      Password:
      <input type="text" onChange={(e) => setPassword(e.target.value)} />
      <br />
      Name:
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <br />
      <button onClick={onSubmit}>Register</button>
    </>
  );
}

RegisterForm.propTypes = {
  submit: PropTypes.func
};

export default RegisterForm;
