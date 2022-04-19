import * as React from 'react';
import Chip from '@mui/material/Chip';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import styles from './Style.module.css';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import Checkbox from '@mui/material/Checkbox';
import { apiCall } from '../components/Helper';
import { Button } from '@mui/material';

// <img src={question.media} className={styles.media} alt="Question Media" />;

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
  const initTime =
    question.duration -
    (new Date() - new Date(question.isoTimeLastQuestionStarted)) / 1000;
  const [time, setTime] = React.useState(initTime >= 0 ? initTime : 0);
  const [answers, setAnswers] = React.useState([]);
  React.useEffect(() => {
    const timezzz =
      question.duration -
      (new Date() - new Date(question.isoTimeLastQuestionStarted)) / 1000;
    setTime(timezzz >= 0 ? timezzz : 0);
    setAnswers(new Array(question.options.length).fill(false));
  }, [question]);

  React.useEffect(() => {
    // time's up
    if (time <= 0) {
      // get correct answer
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
    apiCall(`play/${playerID}/answer`, 'PUT', { answerIds: indices });
  };

  return (
    <>
      <Chip className={styles.alignLeft} label={`Player: ${playerName}`} />
      <p>
        Type: {question.type}, Timer: {Math.ceil(time)}, Credit:{' '}
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
            <CardMedia
              className={styles.media}
              component="img"
              image={question.media}
              alt="Question Media"
            />
              )
            )}
        <Grid container spacing={{ xs: 2, md: 3 }} style={{ margin: '10px' }}>
          {question.options.map((op, index) => (
            <Grid item xs={12} sm={12} md={6} key={index}>
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
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress
              sx={{ height: '30px', borderRadius: '5px' }}
              color="secondary"
              variant="determinate"
              value={(100 * time) / question.duration}
            />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(
              time
            )} s`}</Typography>
          </Box>
        </Box>
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
