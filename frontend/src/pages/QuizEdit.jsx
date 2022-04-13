import { useParams, useNavigate } from 'react-router-dom';
import React from 'react';
import { NavTabs } from '../components/NavTab';
import QuestionCard from '../components/QuestionCard';
import { apiCall } from '../components/Helper';
import styles from '../components/Style.module.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function QuizEdit () {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  });
  const params = useParams();
  const [loading, setLoading] = React.useState(false);
  const [quiz, setQuiz] = React.useState('');
  const [questions, setQuestions] = React.useState([]);
  const [questionDeleted, setQuestionDeleted] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    apiCall(`admin/quiz/${params.quizid}`, 'GET', {}).then((data) => {
      setQuiz(data);
      setQuestions(data.questions);
      setQuestionDeleted(false);
      setLoading(false);
    });
  }, [questionDeleted]);

  return (
    <>
      <NavTabs />
      {loading && (
        <Box className={styles.loadingBox}>
          <CircularProgress />
        </Box>
      )}

      {!loading && (
        <div id="page" className={styles.pageAlign}>
          <Button
            className={styles.space}
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
                quizID={parseInt(params.quizid)}
                questionID={idx}
                quiz={quiz}
                deleteLive={setQuestionDeleted}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
