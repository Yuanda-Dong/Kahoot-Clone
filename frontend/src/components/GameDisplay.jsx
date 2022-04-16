import * as React from 'react';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import styles from './Style.module.css';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
const colorPalette = [
  '#e4e9be',
  '#95d1cc',
  '#8d8daa',
  '#c69b7b',
  '#a2d5ab',
  '#fdd7aa'
];
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  cursor: 'pointer'
}));

export default function GameDisplay ({ question, playerName }) {
  const [time, setTime] = React.useState(question.duration);
  React.useEffect(() => {
    setTime(question.duration);
  }, [question]);

  // const counter = React.useRef();

  // React.useEffect(() => {
  //   counter.current = setInterval(() => {
  //     setTime((time) => time - 1);
  //   }, 1000);
  //   return () => clearInterval(counter.current);
  // }, []);
  // React.useEffect(() => {
  //   if (time <= 0) {
  //     clearInterval(counter.current);
  //   }
  // }, [time]);
  // if (question.duration > 50) {
  //   setTime(50);
  // }

  return (
    <>
      <Chip label={playerName} />
      <p>
        Timer: {time} Credit: {'🪙'.repeat(question.credit)}
      </p>
      <h1>{question.question}</h1>
      <Box className={styles.pageAlign}>
        {question.media && question.media.includes('youtube')
          ? (
          <ReactPlayer
            url={question.media}
            className={styles.media}
            alt="Question Media"
            controls={true}
          />
            )
          : (
              question.media && (
            <img
              src={question.media}
              className={styles.media}
              alt="Question Media"
            />
              )
            )}
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          style={{ margin: '10px' }}
        >
          {question.options.map((op, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item sx={{ backgroundColor: colorPalette[index] }}>{op}</Item>
            </Grid>
          ))}
        </Grid>
        <Button
          disabled={time === 0}
          size="large"
          color="success"
          variant="outlined"
        >
          Submit
        </Button>
      </Box>
    </>
  );
}
GameDisplay.propTypes = {
  question: PropTypes.object,
  playerName: PropTypes.string
};

// {
//   "question": {
//     "question": "Q1",
//     "options": [
//       "A1",
//       "A2"
//     ],
//     "duration": 20,
//     "credit": 3,
//     "type": "Single choice",
//     "isoTimeLastQuestionStarted": "2022-04-16T09:56:35.320Z"
//   }
// }
