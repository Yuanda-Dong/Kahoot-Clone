import React from 'react';
// import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
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
        role={'input'}
        aria-label="Email input"
        required
        id="emailRegister"
        label="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        role={'input'}
        aria-label="Password input"
        className={styles.space}
        id="passwordRegister"
        label="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        role={'input'}
        aria-label="Name input"
        required
        id="nameRegister"
        label="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <Box className={`${styles.align} ${styles.space}`}>
        <Button
          id="registerConfirm"
          aria-label="confirm registration"
          variant="outlined"
          onClick={onSubmit}
        >
          Register
        </Button>
        <Button
          id="registerCancel"
          aria-label="cancel registration"
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
