import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../components/Helper';
import { NavTabs } from '../components/NavTab';
import styles from '../components/Style.module.css';

function QuizNew () {
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const token = localStorage.getItem('authToken');
  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  });

  const createQuiz = () => {
    apiCall('admin/quiz/new', 'POST', { name }).then((data) =>
      console.log(data)
    );
  };

  return (
    <>
      <NavTabs />
      <h1>Add A New Quiz</h1>
      <Box
        className={`${styles.align} ${styles.pageMargin}`}
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
          label="Quiz Name"
          variant="filled"
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          disabled={name.length === 0}
          variant="contained"
          size="large"
          onClick={createQuiz}
        >
          Create
        </Button>
      </Box>
    </>
  );
}

export default QuizNew;
