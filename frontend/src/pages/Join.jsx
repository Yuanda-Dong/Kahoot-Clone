import React from 'react';
// import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import styles from '../components/Style.module.css';

export default function Join () {
  //   const navigate = useNavigate();
  const [sessionID, setSessionID] = React.useState(0);
  const [name, setName] = React.useState('');
  //   const joinHandler = (e)=>{

  //   }

  return (
    <>
      <h1>This is the Join page</h1>
      <Box
        className={`${styles.pageAlign} ${styles.pageMargin}`}
        sx={{
          maxWidth: '100%'
        }}
      >
        <TextField
          sx={{
            width: '70%',
            minWidth: 300
          }}
          id="standard-basic"
          label="Session ID"
          variant="filled"
          onChange={(e) => setSessionID(e.target.value)}
        />
        <TextField
          sx={{
            width: '70%',
            minWidth: 300
          }}
          id="standard-basic"
          label="Player's Name"
          variant="filled"
          onChange={(e) => setName(e.target.value)}
        />
        <Button disabled={!sessionID || !name} variant="contained" size="large">
          Join
        </Button>
      </Box>
    </>
  );
}
