import React from 'react';
import { apiCall } from '../components/Helper';
import NavTabs from '../components/NavTab';
import QuizDiv from '../components/QuizDiv';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Dashboard () {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  });

  // fetch quiz data
  const [quizData, getQuizData] = React.useState([]);
  const [quizModified, setquizModifed] = React.useState(false);
  React.useEffect(() => {
    apiCall('admin/quiz', 'GET', {}).then((data) => {
      getQuizData(data.quizzes);
      setquizModifed(false);
    });
  }, [quizModified]);
  return (
    <>
      <NavTabs />
      <Button variant="outlined" onClick={() => navigate('/quiz/new')}>
        Create New Quiz
      </Button>

      {quizData.map((quiz) => {
        return (
          <QuizDiv
            key={quiz.id}
            active={quiz.active}
            quizId={quiz.id}
            createdAt={quiz.createdAt}
            name={quiz.name}
            thumbnail={quiz.thumbnail}
            update={setquizModifed}
          />
        );
      })}
    </>
  );
}
export default Dashboard;
