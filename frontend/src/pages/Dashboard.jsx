import React from 'react';
import { apiCall, sortQuiz } from '../components/Helper';
import { NavTabs } from '../components/NavTab';
import QuizDiv from '../components/QuizDiv';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import styles from '../components/Style.module.css';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
// import myJason from '../example.json';
// const jsonData = JSON.parse(myJason);

function Dashboard () {
  const navigate = useNavigate();
  // loading icon
  const [loading, setLoading] = React.useState(true);
  const token = localStorage.getItem('authToken');

  const handleJSON = async (event) => {
    const file = event.target.files[0];
    const data = await file.text();
    const quizObj = JSON.parse(data);
    if (
      quizObj.name &&
      quizObj.questions &&
      quizObj.questions.length > 0 &&
      quizObj.questions.reduce(
        (a, b) =>
          a &&
          b.type &&
          ['Single choice', 'Multiple choice'].includes(b.type) &&
          b.credit &&
          typeof b.credit === 'number' &&
          b.credit >= 0 &&
          b.duration &&
          typeof b.duration === 'number' &&
          b.duration >= 0 &&
          b.question &&
          b.options &&
          Object.keys(b.options).length >= 2 &&
          Object.keys(b.options).length <= 6 &&
          b.correctAnswer &&
          Object.keys(b.correctAnswer).length > 0 &&
          Object.keys(b.correctAnswer).length ===
            Object.keys(b.options).length &&
          ((b.type === 'Single choice' &&
            b.correctAnswer.reduce((x, y) => x + (y ? 1 : 0), 0) === 1) ||
            b.type === 'Multiple choice') &&
          ((b.type === 'Multiple choice' &&
            b.correctAnswer.reduce((x, y) => x + (y ? 1 : 0), 0) >= 1) ||
            b.type === 'Single choice'),
        true
      )
    ) {
      await apiCall('admin/quiz/new', 'POST', { name: quizObj.name });
      const quzzies = await apiCall('admin/quiz', 'GET', {});
      const quizID = sortQuiz(quzzies.quizzes)[0].id;
      await apiCall(`admin/quiz/${quizID}`, 'PUT', quizObj);
      setquizModifed(true);
    } else {
      alert(
        'The JSON file needs to be in a specific format, please check example.json for a simple example.'
      );
    }
  };
  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  });

  // fetch quiz data
  const [quizData, getQuizData] = React.useState([]);
  const [questionData, setQuestionData] = React.useState([]);
  const [quizModified, setquizModifed] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    const IDs = [];
    apiCall('admin/quiz', 'GET', {})
      .then((data) => {
        // console.log(data);
        getQuizData(data.quizzes);
        return sortQuiz(data.quizzes);
      })
      .then((quizzes) => {
        quizzes.map((quiz) => {
          IDs.push(quiz.id);
          return null;
        });
        return IDs;
      })
      .then((ids) => {
        const requests = ids.map((id) =>
          fetch(`http://localhost:5005/admin/quiz/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('authToken')
            }
          })
        );

        return requests;
      })
      .then((quizzes) => {
        Promise.allSettled(quizzes)
          .then((responses) => {
            return Promise.all(responses.map((res) => res.value.json()));
          })
          .then((data) => {
            const qs = [];
            data.map((quiz) => {
              qs.push(quiz.questions);
              setQuestionData(qs);
              return null;
            });
            setquizModifed(false);
            setLoading(false);
          });
      });
  }, [quizModified]);

  return (
    <>
      <NavTabs />

      {loading && (
        <Box className={styles.loadingBox}>
          <CircularProgress />
        </Box>
      )}

      {!loading && (
        <div className={styles.pageAlign}>
          <div>
            <Button
              variant="outlined"
              onClick={() => navigate('/quiz/new')}
              sx={{ m: 2 }}
              id="buttonCreateQuiz"
            >
              Create New Quiz
            </Button>
            <Button
              aria-label="Upload"
              variant="outlined"
              sx={{ m: 2 }}
              component="label"
            >
              Upload JSON File
              <input
                id="uploadQuiz"
                type="file"
                hidden
                accept="application/JSON"
                onChange={handleJSON}
              />
            </Button>
          </div>
          <div className={styles.cardPanel}>
            {quizData.map((quiz, idx) => {
              return (
                <QuizDiv
                  key={idx}
                  quiz={quiz}
                  questions={questionData[idx]}
                  update={setquizModifed}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
export default Dashboard;
