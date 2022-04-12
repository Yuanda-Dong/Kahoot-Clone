import React from 'react';
// import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import styles from './Style.module.css';
import { apiCall } from './Helper';
import { useNavigate } from 'react-router-dom';

function LoginForm () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const onLogin = () => {
    apiCall('admin/auth/login', 'POST', { email, password }).then((data) => {
      localStorage.setItem('authToken', data.token);
      console.log(data);
      navigate('/dashboard');
    });
    // login('admin/auth/login', 'POST', { email, password });
  };

  return (
    <Box className={styles.flexCol} component="form">
      <TextField
        required
        id="outlined-required"
        label="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Box className={styles.alignRight}>
        <Button
          className={styles.buttonSpace}
          variant="outlined"
          onClick={onLogin}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}
// LoginForm.propTypes = {
//   login: PropTypes.func
// };
export default LoginForm;
