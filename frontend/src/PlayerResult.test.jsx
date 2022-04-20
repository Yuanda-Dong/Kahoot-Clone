import React from 'react';
import PlayerResult from './components/PlayerResult';
import { shallow } from 'enzyme';
import TableCell from '@mui/material/TableCell';
describe('PlayerResult', () => {
  it('should have correct player name', () => {
    const result = [];
    const playerName = 'Me';
    const wrapper = shallow(
      <PlayerResult result={result} playerName={playerName} />
    );

    expect(wrapper.find('h1').text()).toBe(`Result for ${playerName}`);
  });

  it('should have correct player result information', () => {
    const result = [
      {
        questionStartedAt: '2022-04-19T17:21:06.356Z',
        answeredAt: '2022-04-19T17:21:35.987Z',
        answerIds: [0],
        correct: false
      },
      {
        questionStartedAt: '2022-04-19T17:21:50.269Z',
        answeredAt: '2022-04-19T17:21:59.648Z',
        answerIds: [1],
        correct: false
      }
    ];
    const playerName = 'Me';
    const wrapper = shallow(
      <PlayerResult result={result} playerName={playerName} />
    );
    const expected = [
      'Question',
      'You Answer',
      'Time',
      'Question 1',
      'Wrong',
      ' 29.631 seconds',
      'Question 2',
      'Wrong',
      ' 9.379 seconds'
    ];
    expect(wrapper.find(TableCell).map((e) => e.text())).toEqual(expected);
  });
});
