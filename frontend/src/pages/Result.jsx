import React from 'react';
// import { apiCall } from '../components/Helper';
import { DataGrid } from '@mui/x-data-grid';
import { NavTabs } from '../components/NavTab';
import { useNavigate, useParams } from 'react-router-dom';
import { apiCall } from '../components/Helper';

export default function Result () {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  });

  const params = useParams();
  const sessionID = params.sessionID;
  const quizid = params.quizid;
  const [rows, setRows] = React.useState([]);
  const calScore = (questions, answers) => {
    let score = 0;
    for (let i = 0; i < answers.length; i++) {
      score += (answers[i].correct ? 1 : 0) * questions[i].credit;
    }
    return score;
  };
  React.useEffect(() => {
    apiCall('admin/quiz/' + quizid, 'GET').then((res) => {
      const questions = res.questions;
      apiCall(`admin/session/${sessionID}/results`).then((res) => {
        setRows(
          res.results
            .sort(
              (a, b) =>
                calScore(questions, b.answers) - calScore(questions, a.answers)
            )
            .slice(0, 5)
            .map((e, idx) => {
              return {
                id: idx + 1,
                name: e.name,
                score: calScore(questions, e.answers),
                correct: e.answers.reduce((x, y) =>
                  x.correct ? 1 : 0 + y.correct ? 1 : 0
                )
              };
            })
        );
      });
    });
  }, []);

  const columns = [
    { field: 'id', headerName: 'Rank' },
    { field: 'name', headerName: 'Name' },
    {
      field: 'score',
      headerName: 'Score',
      type: 'number'
    },
    {
      field: 'correct',
      headerName: 'Number of correct answers',
      type: 'number',
      width: 200
    }
  ];

  // const rows = [
  //   { id: 1, name: 'Jon', score: 35, correct: 5 },
  //   { id: 2, name: 'Cersei', score: 42, correct: 5 },
  //   { id: 3, name: 'Jaime', score: 45, correct: 5 },
  //   { id: 4, name: 'Arya', score: 16, correct: 5 },
  //   { id: 5, name: 'Daenerys', score: 50, correct: 5 }
  // ];

  // console.log(results);
  return (
    <>
      <NavTabs />
      <h1>This is a result page</h1>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </>
  );
}

// {
//   "results": [
//     {
//       "name": "1",
//       "answers": [
//         {
//           "questionStartedAt": "2022-04-17T08:27:31.738Z",
//           "answeredAt": "2022-04-17T08:27:35.237Z",
//           "answerIds": [
//             1
//           ],
//           "correct": false
//         },
//         {
//           "questionStartedAt": "2022-04-17T08:27:40.293Z",
//           "answeredAt": "2022-04-17T08:27:42.149Z",
//           "answerIds": [
//             1,
//             2
//           ],
//           "correct": false
//         }
//       ]
//     },
//     {
//       "name": "2",
//       "answers": [
//         {
//           "questionStartedAt": "2022-04-17T08:27:31.738Z",
//           "answeredAt": "2022-04-17T08:27:33.906Z",
//           "answerIds": [
//             0
//           ],
//           "correct": true
//         },
//         {
//           "questionStartedAt": "2022-04-17T08:27:40.293Z",
//           "answeredAt": "2022-04-17T08:27:44.149Z",
//           "answerIds": [
//             0,
//             1
//           ],
//           "correct": true
//         }
//       ]
//     }
//   ]
// }
