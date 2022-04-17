import React from 'react';
// import { apiCall } from '../components/Helper';
import { NavTabs } from '../components/NavTab';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../components/Helper';
import ReportList from '../components/ReportList';
import styles from '../components/Style.module.css';

export default function Result () {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  });
  const [allQuizzes, setAllQuizzes] = React.useState([]);
  const [displayReport, setDisplayReport] = React.useState([]);
  React.useEffect(() => {
    apiCall('admin/quiz', 'GET', {}).then((body) => {
      if (!body.error) {
        setAllQuizzes(body.quizzes);
      }
    });
  }, []);

  return (
    <>
      <NavTabs />
      <div className={styles.reportAlign}>
        <div>
          {allQuizzes.map((quiz, idx) => {
            return (
              <ReportList key={idx} quiz={quiz} getReport={setDisplayReport} />
            );
          })}
        </div>

        {displayReport && <h2>{displayReport}</h2>}
      </div>
    </>
  );
}
