import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DropDown from '../components/DropDown';
import { apiCall, fileToDataUrl } from '../components/Helper';
import TextField from '@mui/material/TextField';
import { NavTabs } from '../components/NavTab';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import styles from '../components/Style.module.css';
export default function QuestionEdit () {
  const params = useParams();
  const quizid = params.quizid;
  const questionid = params.questionid;
  const navigate = useNavigate();
  // const [questions, setQuestions] = React.useState([]);
  const [question, setQuestion] = React.useState({
    options: ['', ''],
    correctAnswer: [false, false],
    duration: 5,
    credit: 1,
    type: 'Single choice'
  });
  const [answers, setAnswers] = React.useState(['', '']);
  const [correct, setCorrect] = React.useState([false, false]);
  const [num, setNum] = React.useState(2);

  const handleType = (val) => {
    const newQuestion = { ...question };
    newQuestion.type = val;
    setQuestion(newQuestion);
  };

  const handleDuration = (val) => {
    const newQuestion = { ...question };
    newQuestion.duration = val;
    setQuestion(newQuestion);
  };

  const handleCredit = (val) => {
    const newQuestion = { ...question };
    newQuestion.credit = val;
    setQuestion(newQuestion);
  };

  const handleQuestion = (event) => {
    const newQuestion = { ...question };
    newQuestion.question = event.target.value;
    setQuestion(newQuestion);
  };

  const handleMedia = (event) => {
    const newQuestion = { ...question };
    newQuestion.media = event.target.value;
    setQuestion(newQuestion);
  };

  const handleCorrect = (event, idx) => {
    const newCorrect = [...correct];
    if (question.type === 'Single choice' && correct.includes(true)) {
      newCorrect[correct.indexOf(true)] = false;
    }
    newCorrect[idx] = !newCorrect[idx];
    setCorrect(newCorrect);
  };
  const handleAnswer = (event, idx) => {
    const newAnswer = [...answers];
    newAnswer[idx] = event.target.value;
    setAnswers(newAnswer);
  };
  const handleImage = (event) => {
    const file = event.target.files[0];
    fileToDataUrl(file).then((data) => {
      const newQuestion = { ...question };
      newQuestion.media = data;
      setQuestion(newQuestion);
    });
  };
  const removeAns = () => {
    if (num > 2) {
      setNum(num - 1);
      // const newCorrect = [...correct];
      // const newAnswer = [...answers];
      setCorrect(correct.slice(0, correct.length - 1));
      setAnswers(answers.slice(0, answers.length - 1));
    }
  };
  //   console.log(quiz);

  const addMore = () => {
    if (num < 6) {
      setNum(num + 1);
      const newCorrect = [...correct];
      const newAnswer = [...answers];
      newCorrect.push(false);
      newAnswer.push('');
      setCorrect(newCorrect);
      setAnswers(newAnswer);
    }
  };
  const Cancel = () => {
    navigate('/quiz/' + quizid);
  };
  useEffect(() => {
    apiCall('admin/quiz/' + quizid, 'GET').then((body) => {
      if (body.error) {
        alert(body.error);
      } else {
        // console.log(body.questions[questionid]);
        setQuestion(
          body.questions[questionid] ? body.questions[questionid] : question
        );
        // setQuestions(body.questions);
        setNum(
          body.questions[questionid]
            ? body.questions[questionid].options.length
            : 2
        );

        setAnswers(
          body.questions[questionid]
            ? body.questions[questionid].options
            : answers
        );
        setCorrect(
          body.questions[questionid]
            ? body.questions[questionid].correctAnswer
            : correct
        );
      }

      // }
    });
  }, []);

  const Submit = () => {
    question.options = [...answers];
    question.correctAnswer = [...correct];

    apiCall('admin/quiz/' + quizid, 'GET').then((body) => {
      if (body.error) {
        alert(body.error);
      } else {
        if (parseInt(questionid) === body.questions.length) {
          // if (parseInt(questionid) > 0) {
          //   body.questions[parseInt(questionid) - 1].last = 0;
          // }
          // question.last = 1;
          body.questions.push(question);
        } else {
          body.questions[questionid] = question;
        }
        // console.log(body.questions);
        apiCall(`admin/quiz/${quizid}`, 'PUT', body).then((body) => {
          if (body.error) {
            alert(body.error);
          }
        });
        navigate('/quiz/' + quizid);
      }
    });
  };

  // useEffect(() => {
  // const newquestions = [...questions];
  // question.options = [...answers];
  // question.correctAnswer = [...correct];
  // newquestions[questionid] = question;
  // setQuestions(newquestions);
  // }, [answers, correct]);

  return (
    <>
      <NavTabs />

      <div className={styles.pageMargin}>
        <TextField
          id="Question"
          label="Question"
          variant="outlined"
          value={question.question ? question.question : ''}
          sx={{ width: 500 }}
          onChange={handleQuestion}
        />
        <DropDown
          dropId="Question Type"
          options={['Single choice', 'Multiple choice']}
          target={question.type ? question.type : 'Single choice'}
          handle={handleType}
        ></DropDown>

        <DropDown
          dropId="Time Allowed (in seconds)"
          options={[5, 10, 15, 20, 25, 30, 40, 50, 60]}
          target={question.duration ? question.duration : 30}
          handle={handleDuration}
        ></DropDown>

        <DropDown
          dropId="Question Score"
          options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          target={question.credit ? question.credit : 1}
          handle={handleCredit}
        ></DropDown>
        <TextField
          id="Media upload"
          label="Youtube link / encoded image"
          variant="outlined"
          value={question.media ? question.media : ''}
          sx={{ width: 500, mr: 2 }}
          onChange={handleMedia}
        />

        <div>
          <Button variant="contained" component="label">
            Upload Image [jpg/jpeg]
            <input
              type="file"
              hidden
              accept="image/jpeg, image/jpg"
              onChange={handleImage}
            />
          </Button>
        </div>

        {answers.map((e, idx) => (
          <span style={{ display: 'inline-block' }} key={idx}>
            <TextField
              value={e}
              label={`Answer ${idx + 1}`}
              sx={{ width: 500, mt: 1.5, mb: 1.5 }}
              onChange={(event) => handleAnswer(event, idx)}
            />
            <Checkbox
              checked={!!correct[idx]}
              onClick={(event) => handleCorrect(event, idx)}
            />
          </span>
        ))}

        <div>
          <Button variant="contained" onClick={addMore}>
            Add More Answers [Max:6]
          </Button>
          <Button variant="contained" color="error" onClick={removeAns}>
            Remove Last Answer
          </Button>
        </div>
        <Button
          variant="contained"
          color="success"
          onClick={Submit}
          sx={{ mt: 1.5 }}
        >
          Submit
        </Button>
        <Button variant="contained" onClick={Cancel} sx={{ mt: 1.5 }}>
          Cancel
        </Button>
      </div>
    </>
  );
}
