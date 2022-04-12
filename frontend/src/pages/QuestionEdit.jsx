import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DropDown from '../components/DropDown';
import { apiCall } from '../components/Helper';
import TextField from '@mui/material/TextField';

export default function QuestionEdit () {
  const params = useParams();
  const quizid = params.quizid;
  const questionid = params.questionid;
  const [questions, setQuestions] = React.useState([]);
  const [question, setQuestion] = React.useState({});

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
  //   console.log(quiz);
  useEffect(() => {
    apiCall('admin/quiz/' + quizid, 'GET').then((body) => {
      setQuestions(body.questions);
    });
  }, []);

  useEffect(() => {
    const newquestions = [...questions];
    if (questionid + 1 > questions.length) {
      newquestions.push(question);
      setQuestions(newquestions);
    } else {
      newquestions[questionid] = question;
      setQuestions(newquestions);
    }
  }, [question]);

  useEffect(() => {
    apiCall('admin/quiz/' + quizid, 'GET').then((body) => {
      body.questions = questions;
      // console.log(typeof body);
      apiCall(`admin/quiz${quizid}`, 'PUT', body);
    });
  }, [questions]);

  return (
    <>
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
        target={question.duration ? question.duration : 5}
        handle={handleDuration}
      ></DropDown>

      <DropDown
        dropId="Question Score"
        options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        target={question.credit ? question.credit : 1}
        handle={handleCredit}
      ></DropDown>
    </>
  );
}
