import React from 'react';
// import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import styles from './Style.module.css';
import { apiCall, emailValid, passwordValid } from './Helper';
import { useNavigate } from 'react-router-dom';

function LoginForm () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const onLogin = () => {
    if (emailValid(email) && passwordValid(password)) {
      apiCall('admin/auth/login', 'POST', { email, password }).then((data) => {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('email', email);
        navigate('/dashboard');
      });
    }
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
        className={styles.space}
        id="outlined-password-input"
        label="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Box className={styles.align}>
        <Button className={styles.space} variant="outlined" onClick={onLogin}>
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
