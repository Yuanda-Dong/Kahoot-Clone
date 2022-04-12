import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { apiCall } from './Helper';

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
    });
  };

  const thisQuestion = props.quiz.questions[props.questionID];
  console.log(thisQuestion);
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Question Title
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Question Content
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          alt="question media"
          height="100"
          image="#"
        />
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
