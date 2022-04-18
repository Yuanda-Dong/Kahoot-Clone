import React from 'react';
// import { apiCall } from '../components/Helper';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { NavTabs } from '../components/NavTab';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../components/Helper';
import ReportList from '../components/ReportList';
import styles from '../components/Style.module.css';
import ResultComp from '../components/ResultComp';

export default function Result () {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  });
  const [loading, setLoading] = React.useState(true);
  const [allQuizzes, setAllQuizzes] = React.useState([]);
  const [displayReport, setDisplayReport] = React.useState([]);
  React.useEffect(() => {
    apiCall('admin/quiz', 'GET', {}).then((body) => {
      if (!body.error) {
        setAllQuizzes(body.quizzes);
        setLoading(false);
      }
    });
  }, []);

  return (
    <>
      <NavTabs />
      {loading && (
        <Box className={styles.loadingBox}>
          <CircularProgress />
        </Box>
      )}
      {!loading && (
        <div className={styles.reportAlign}>
          <div>
            {allQuizzes.map((quiz, idx) => {
              return (
                <ReportList
                  key={idx}
                  quiz={quiz}
                  getReport={setDisplayReport}
                />
              );
            })}
          </div>

          {displayReport.length > 0 && (
            <>
              <ResultComp
                sessionID={displayReport[0]}
                quizid={displayReport[1]}
              />
            </>
          )}
        </div>
      )}
    </>
  );
}
