import React from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../components/Helper';
import NavTabs from '../components/NavTab';

function QuizNew () {
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const token = localStorage.getItem('token');
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
      <h1>QuizNew</h1>
      Quiz name: <input type="text" onChange={(e) => setName(e.target.value)} />
      <button onClick={createQuiz}>Create</button>
    </>
  );
}

export default QuizNew;
