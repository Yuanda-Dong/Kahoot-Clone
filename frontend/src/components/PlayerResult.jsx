import * as React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function PlayerResult ({ result, playerName }) {
  // console.log(JSON.stringify(result));
  // console.log(playerName);
  return (
    <>
      <h1>Result for {playerName}</h1>
      <div>
        <p>
          NOTE: If the answer is submitted in less then half of the allowed
          duration, bonus mark is awarded.
        </p>
        <h5>Score Calculation Rule:</h5>
        <p>
          SCORE = <sup>(2 x TIME_REMAINED x QUESTION_CREDIT)</sup>&frasl;
          <sub>(TIME_TOTAL)</sub>, the maximum achievable mark is therefore the
          DOUBLE of original question credit.
        </p>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: '100%' }} aria-label="Player result table">
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell align="right">You Answer</TableCell>
              <TableCell align="right">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result.map((r, idx) => (
              <TableRow
                key={idx}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {`Question ${idx + 1}`}
                </TableCell>
                <TableCell align="right">
                  {r.answeredAt && (r.correct ? 'Correct' : 'Wrong')}
                  {!r.answeredAt && 'Unanswered'}
                </TableCell>
                <TableCell align="right">
                  {r.answeredAt &&
                    ` ${
                      (new Date(r.answeredAt) - new Date(r.questionStartedAt)) /
                      1000
                    } seconds`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

PlayerResult.propTypes = {
  result: PropTypes.array,
  playerName: PropTypes.string
};
