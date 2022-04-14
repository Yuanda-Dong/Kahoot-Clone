import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import styles from '../components/Style.module.css';

export default function Join () {
  // 942691
  const navigate = useNavigate();
  const params = useParams();
  const session = params.sessionID;
  console.log(session);
  const [sessionID, setSessionID] = React.useState(session);
  const [name, setName] = React.useState('');
  const joinHandler = (e) => {
    navigate(`/play/${sessionID}/${name}`);
  };

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
          value={session}
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
        <Button
          disabled={!sessionID || !name}
          variant="contained"
          size="large"
          onClick={joinHandler}
        >
          Join
        </Button>
      </Box>
    </>
  );
}
