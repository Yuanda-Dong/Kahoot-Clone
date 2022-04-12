import { useParams, useNavigate } from 'react-router-dom';
import React from 'react';
import { NavTabs } from '../components/NavTab';
import QuestionCard from '../components/QuestionCard';
import { apiCall } from '../components/Helper';

import Button from '@mui/material/Button';

export default function QuizEdit () {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  });
  const params = useParams();
  const [quiz, setQuiz] = React.useState('');
  const [questions, setQuestions] = React.useState([]);
  const [questionDeleted, setQuestionDeleted] = React.useState(false);
  React.useEffect(() => {
    apiCall(`admin/quiz/${params.quizid}`, 'GET', {}).then((data) => {
      setQuiz(data);
      setQuestions(data.questions);
      setQuestionDeleted(false);
    });
  }, [questionDeleted]);

  return (
    <>
      <NavTabs />
      <Button
        variant="outlined"
        onClick={() => {
          navigate(`/quiz/${params.quizid}/${questions.length}`);
        }}
      >
        Create New Question
      </Button>

      {questions.map((q, idx) => {
        return (
          <QuestionCard
            key={idx}
            quizID={params.quizid}
            questionID={idx}
            quiz={quiz}
            deleteLive={setQuestionDeleted}
          />
        );
      })}
    </>
  );
}
