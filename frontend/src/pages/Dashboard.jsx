import React from 'react';
import { apiCall } from '../components/Helper';
import NavTabs from '../components/NavTab';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Dashboard () {
  const navigate = useNavigate();

  // fetch quiz data
  const [quizData, getQuizData] = React.useState([]);
  React.useEffect(() => {
    apiCall('admin/quiz', 'GET', {}).then((data) => {
      getQuizData(data);
    });
  }, []);
  return (
    <>
      <NavTabs />
      <div>{quizData.id}</div>
      <Button variant="outlined" onClick={() => navigate('/quiz/new')}>
        Create New Quiz
      </Button>
    </>
  );
}

export default Dashboard;
