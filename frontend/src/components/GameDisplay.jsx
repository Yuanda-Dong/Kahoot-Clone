import * as React from 'react';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import styles from './Style.module.css';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import Checkbox from '@mui/material/Checkbox';
import { apiCall } from '../components/Helper';
import { Button } from '@mui/material';
const colorPalette = [
  '#e4e9be',
  '#95d1cc',
  '#8d8daa',
  '#c69b7b',
  '#a2d5ab',
  '#fdd7aa'
];
const Item = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  cursor: 'pointer'
}));

export default function GameDisplay ({ question, playerName, playerID }) {
  const [time, setTime] = React.useState(
    Math.ceil(
      question.duration -
        (new Date() - new Date(question.isoTimeLastQuestionStarted)) / 1000
    )
  );
  const [answers, setAnswers] = React.useState([]);
  const counter = React.useRef();
  React.useEffect(() => {
    setTime(
      Math.ceil(
        question.duration -
          (new Date() - new Date(question.isoTimeLastQuestionStarted)) / 1000
      )
    );
    counter.current = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);

    setAnswers(new Array(question.options.length).fill(false));
    return () => clearInterval(counter.current);
  }, [question.isoTimeLastQuestionStarted]);

  React.useEffect(() => {
    if (time <= 0) {
      apiCall(`play/${playerID}/answer`, 'GET', {}).then((res) => {
        const newAnswers = [...answers];
        newAnswers.forEach((e, idx) => {
          if (res.answerIds.includes(idx)) {
            newAnswers[idx] = true;
          } else {
            newAnswers[idx] = false;
          }
        });
        setAnswers(newAnswers);
      });
      clearInterval(counter.current);
    }
  }, [time]);

  const handleClick = (event, index) => {
    const newAnswers = [...answers];
    if (question.type === 'Single choice' && answers.includes(true)) {
      newAnswers[answers.indexOf(true)] = false;
    }
    newAnswers[index] = !newAnswers[index];
    setAnswers(newAnswers);
    const indices = [];
    let idx = newAnswers.indexOf(true);
    while (idx !== -1) {
      indices.push(idx);
      idx = newAnswers.indexOf(true, idx + 1);
    }
    // console.log(indices);
    apiCall(`play/${playerID}/answer`, 'PUT', { answerIds: indices });
  };

  return (
    <>
      <Chip label={playerName} />
      <p>
        Type: {question.type}, Timer: {time}, Credit:{' '}
        {'🪙'.repeat(question.credit)}
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
              <Item
                disabled={time <= 0}
                sx={{ backgroundColor: colorPalette[index], width: '100%' }}
                onClick={(event) => handleClick(event, index)}
              >
                {op}
                <Checkbox checked={!!answers[index]} />
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
GameDisplay.propTypes = {
  question: PropTypes.object,
  playerName: PropTypes.string,
  playerID: PropTypes.string
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
