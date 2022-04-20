import { useParams, useNavigate } from 'react-router-dom';
import React from 'react';
import { NavTabs } from '../components/NavTab';
import QuestionCard from '../components/QuestionCard';
import { apiCall, fileToDataUrl, defaultImage } from '../components/Helper';
import styles from '../components/Style.module.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
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
  const handleImage = (event) => {
    const file = event.target.files[0];
    fileToDataUrl(file).then((data) => {
      const newQuiz = { ...quiz };
      newQuiz.thumbnail = data;
      setQuiz(newQuiz);
    });
  };
  const changeName = (event) => {
    const newQuiz = { ...quiz };
    newQuiz.name = event.target.value;
    setQuiz(newQuiz);
  };
  React.useEffect(() => {
    if (quiz !== '') {
      apiCall(`admin/quiz/${params.quizid}`, 'PUT', quiz);
    }
  }, [quiz]);

  React.useEffect(() => {
    setLoading(true);
    apiCall(`admin/quiz/${params.quizid}`, 'GET', {}).then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        setQuiz(data);
        setQuestions(data.questions);
        setQuestionDeleted(false);
        setLoading(false);
      }
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
        <div id="quizEditPage" className={styles.pageAlign}>
          <TextField
            // fullWidth
            // className={styles.alignLeft}
            InputLabelProps={{
              className: styles.quizName
            }}
            inputProps={{
              className: styles.quizName
            }}
            id="quizNameEdit"
            value={quiz.name}
            label="Quiz name: "
            variant="standard"
            onChange={changeName}
          />
          {quiz.thumbnail
            ? (
            <img src={quiz.thumbnail} width={345} alt="Quiz Thumbnail" />
              )
            : (
            <img src={defaultImage} width={345} alt="Quiz Thumbnail" />
              )}
          <Button
            id="quizImageEdit"
            variant="contained"
            component="label"
            aria-label="upload"
          >
            Change thumbnail [jpg/jpeg]
            <input
              type="file"
              hidden
              accept="image/jpeg, image/jpg"
              onChange={handleImage}
            />
          </Button>
          <Button
            id="newQuestion"
            aria-label="create"
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
