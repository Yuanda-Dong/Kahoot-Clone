import * as React from 'react';
import PropTypes from 'prop-types';

export default function PlayerResult ({ result, playerName }) {
  return (
    <div>
      <h1>Result for {playerName}</h1>
      {result.map((e, idx) => (
        <div key={idx}>
          {`Question ${idx + 1} is `}
          {e.answeredAt && (e.correct ? 'correct' : 'wrong')}
          {!e.answeredAt && 'unanswered'}
          {e.answeredAt &&
            e.correct &&
            ` using ${
              (new Date(e.answeredAt) - new Date(e.questionStartedAt)) / 1000
            } seconds`}
        </div>
      ))}
    </div>
  );
}

PlayerResult.propTypes = {
  result: PropTypes.array,
  playerName: PropTypes.string
};
