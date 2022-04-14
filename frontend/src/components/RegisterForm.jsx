import React from 'react';
// import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// import { styled } from '@mui/material/styles'
import { apiCall, emailValid, passwordValid } from './Helper';
import styles from './Style.module.css';
import { useNavigate } from 'react-router-dom';

function RegisterForm () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const navigate = useNavigate();

  const onSubmit = () => {
    if (emailValid(email) && passwordValid(password)) {
      apiCall('admin/auth/register', 'POST', { email, password, name }).then(
        (data) => {
          if (data.token) {
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('email', email);
            console.log(data);
            navigate('/dashboard');
          } else if (data.error) {
            alert(data.error);
          }
        }
      );
    }
  };

  return (
    <Box className={styles.flexCol} component="form">
      <TextField
        required
        id="email"
        label="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        className={styles.space}
        id="password"
        label="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        required
        id="name"
        label="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <Box className={`${styles.align} ${styles.space}`}>
        <Button variant="outlined" onClick={onSubmit}>
          Register
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => navigate('/login')}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

// RegisterForm.propTypes = {
//   submit: PropTypes.func
// };

export default RegisterForm;
