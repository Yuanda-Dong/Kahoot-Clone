import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ResultComp from '../components/ResultComp';
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

  return (
    <>
      <ResultComp sessionID={sessionID} quizid={quizid} />
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
