import React from 'react';
import styles from './/Style.module.css';
// import { DataGrid } from '@mui/x-data-grid';
import { apiCall } from '../components/Helper';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Chart,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement
} from 'chart.js';
Chart.register(LinearScale, CategoryScale, PointElement, LineElement);
// Chart.register(LinearScale, CategoryScale);

export default function Resultcomp({ sessionID, quizid }) {
  const [rows, setRows] = React.useState([]);
  const [lineChartOne, setlineChartOne] = React.useState({});
  const [lineChartTwo, setlineChartTwo] = React.useState({});
  const calScore = (questions, answers) => {
    let score = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].answeredAt) {
        const timeTaken =
          (new Date(answers[i].answeredAt) -
            new Date(answers[i].questionStartedAt)) /
          1000;
        const duration = questions[i].duration;
        const credit = questions[i].credit;
        score +=
          (answers[i].correct ? 1 : 0) *
          (credit +
            (timeTaken < duration / 2
              ? ((duration - 2 * timeTaken) / duration) * credit
              : 0));
      }
    }
    return score.toFixed(1);
  };
  React.useEffect(() => {
    apiCall('admin/quiz/' + quizid, 'GET').then((res) => {
      const questions = res.questions;
      apiCall(`admin/session/${sessionID}/results`).then((res) => {
        const labels1 = [...Array(questions.length).keys()].map(
          (e) => `Q${e + 1}`
        );

        const datasets1 = [
          {
            label: 'Percentage of people got right',
            data: questions
              .map((_, idx) =>
                res.results.reduce(
                  (x, y) =>
                    x + (y.answers[idx] && y.answers[idx].correct ? 1 : 0),
                  0
                )
              )
              .map((e) => e / res.results.length),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ];

        const data1 = {
          labels: labels1,
          datasets: datasets1
        };

        setlineChartOne(data1);

        const datasets2 = [
          {
            label: 'Average Response Time',
            data: questions
              .map((_, idx) =>
                res.results.reduce(
                  (x, y) =>
                    x +
                    (y.answers[idx] && y.answers[idx].answeredAt
                      ? (new Date(y.answers[idx].answeredAt) -
                          new Date(y.answers[idx].questionStartedAt)) /
                        1000
                      : questions[idx].duration),
                  0
                )
              )
              .map((e) => e / res.results.length),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ];

        const data2 = {
          labels: labels1,
          datasets: datasets2
        };
        setlineChartTwo(data2);
        setRows(
          res.results
            .sort(
              (a, b) =>
                calScore(questions, b.answers) - calScore(questions, a.answers)
            )
            .slice(0, 5)
            .map((e, idx) => {
              const nCorrect = e.answers.reduce(
                (x, y) => x + (y.correct ? 1 : 0),
                0
              );
              return {
                id: idx + 1,
                name: e.name,
                score: calScore(questions, e.answers),
                correct: `${nCorrect} / ${questions.length}`
              };
            })
        );
      });
    });
  }, [sessionID, quizid]);

  // const columns = [
  //   { field: 'id', headerName: 'Rank' },
  //   { field: 'name', headerName: 'Name' },
  //   {
  //     field: 'score',
  //     headerName: 'Score',
  //     type: 'number'
  //   },
  //   {
  //     field: 'correct',
  //     headerName: 'Number of correct answers',
  //     type: 'number',
  //     width: 200
  //   }
  // ];
  return (
    <div className={styles.reportContent}>
      <h3>Top 5 players</h3>
      <p>
        Score calculation rule: If the answer is submitted in less then half of
        the allowed duration, bonus mark is given linearly with time taken. More
        precisely, bonus mark = (allowed duration - 2 * time taken) / (allowed
        duration) * question credit , the maximum achievable mark is therefore 2
        * question credit.
      </p>
      <div style={{ height: 400, width: '100%' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="top 5 players result table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Rank</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Score</TableCell>
                <TableCell align="center">Correct</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.score}</TableCell>
                  <TableCell align="center">{row.correct}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <h3>Statistics</h3>
        {Object.keys(lineChartOne).length > 0 && (
          <Line
            data={lineChartOne}
            options={{
              scales: {
                y: {
                  max: 1,
                  min: 0
                }
              }
            }}
          />
        )}

        {Object.keys(lineChartTwo).length > 0 && <Line data={lineChartTwo} />}
      </div>
    </div>
  );
}

Resultcomp.propTypes = {
  sessionID: PropTypes.number,
  quizid: PropTypes.number
};

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
