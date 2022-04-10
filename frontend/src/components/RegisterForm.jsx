import React from 'react';
import PropTypes from 'prop-types';
// import TextField from '@mui/material/TextField';

function RegisterForm ({ submit }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  const onSubmit = () => {
    submit(email, password, name);
  };

  return (
    <>
      {/* <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
      /> */}
      <form role={'form'}></form>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <label htmlFor="name">Name:</label>
      <input id="name" type="text" onChange={(e) => setName(e.target.value)} />
      <br />
      {/* <Button variant="text">Text</Button> */}
      <button onClick={onSubmit}>Register</button>
    </>
  );
}

RegisterForm.propTypes = {
  submit: PropTypes.func
};

export default RegisterForm;
