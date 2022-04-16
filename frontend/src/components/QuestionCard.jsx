import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { apiCall } from './Helper';
import styles from './Style.module.css';
import ReactPlayer from 'react-player';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

export default function QuestionCard (props) {
  const navigate = useNavigate();
  const navigateToQuestionEdit = () => {
    navigate(`/quiz/${props.quizID}/${props.questionID}`);
  };

  const deleteQuestion = () => {
    //   triger questionDeleted, live updates on QuizEdit page
    props.deleteLive(true);
    // remove question from list
    props.quiz.questions.splice(props.questionID, 1);
    // api call, put new quiz information back to server
    apiCall(`admin/quiz/${props.quizID}`, 'PUT', {
      questions: props.quiz.questions,
      name: props.quiz.name,
      thumbnail: props.quiz.thumbnail
    }).then((body) => {
      if (body.error) {
        alert(body.error);
      }
    });
  };

  const thisQuestion = props.quiz.questions[props.questionID];

  return (
    <>
      <Card sx={{ width: 0.8 }}>
        <CardContent>
          {/* question title */}
          <Typography gutterBottom variant="h5" component="div">
            {thisQuestion.question}
          </Typography>

          {/* question metadata */}
          <p>
            Question Type:{' '}
            {thisQuestion.type === 'Single choice'
              ? (
              <span>Single Choice</span>
                )
              : (
              <span>Multiple Choice</span>
                )}{' '}
          </p>
          <p>Time: {thisQuestion.duration} seconds</p>
          <p>Credit: {thisQuestion.credit}</p>

          {/* question uploaded media */}
          {thisQuestion.media && thisQuestion.media.includes('youtube')
            ? (
            <ReactPlayer
              url={thisQuestion.media}
              className={styles.media}
              alt="Question Media"
              controls={true}
            />
              )
            : (
                thisQuestion.media && (
              <img
                src={thisQuestion.media}
                className={styles.media}
                alt="Question Media"
              />
                )
              )}

          {/* question options */}
          <Box sx={{ width: '100%' }}>
            <Stack spacing={2}>
              {thisQuestion.options.map((opt, idx) => {
                const correct = thisQuestion.correctAnswer[idx];
                return (
                  <Item
                    className={correct ? styles.correctAnswer : undefined}
                    key={idx}
                  >
                    {opt}
                  </Item>
                );
              })}
            </Stack>
          </Box>
        </CardContent>

        <CardActions>
          <Button size="small" color="error" onClick={deleteQuestion}>
            Delete
          </Button>
          <Button size="small" onClick={navigateToQuestionEdit}>
            Edit
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

QuestionCard.propTypes = {
  quizID: PropTypes.number,
  questionID: PropTypes.number,
  quiz: PropTypes.object,
  deleteLive: PropTypes.func
};
