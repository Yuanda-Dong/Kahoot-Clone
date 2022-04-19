import React from 'react';
import ReportList from './components/ReportList';
import List from '@mui/material/List';

import ListSubheader from '@mui/material/ListSubheader';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

describe('ReportList', () => {
  const onClick = jest.fn();
  const dummyQuiz = { name: 'QuizName', oldSessions: [0, 1, 2, 3] };

  it('should have a list header', () => {
    const wrapper = shallow(
      <ReportList quiz={dummyQuiz} getReport={onClick} />
    );
    expect(wrapper.find(ListSubheader)).toHaveLength(1);
  });

  it('should have a header being the quiz name', () => {
    const wrapper = shallow(
      <ReportList quiz={dummyQuiz} getReport={onClick} />
    );
    const headerText = wrapper.find(ListSubheader).find(ListItemText);
    expect(headerText.props().primary).toBe('QuizName');
  });

  it('should have 4 session items', () => {
    const wrapper = shallow(
      <ReportList quiz={dummyQuiz} getReport={onClick} />
    );
    const lists = wrapper.find(List);
    expect(lists.find('[component="div"]')).toHaveLength(4);
  });

  it('contains session id in session item', () => {
    const wrapper = shallow(
      <ReportList quiz={dummyQuiz} getReport={onClick} />
    );
    const firstItem = wrapper.find(List).find('[component="div"]').first();
    expect(firstItem.find(ListItemText).props().primary).toBe('Session: 0');
  });

  it('calls function when session item is clicked', () => {
    const wrapper = shallow(
      <ReportList quiz={dummyQuiz} getReport={onClick} />
    );
    const buttons = wrapper.find(ListItemButton);
    buttons.first().simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
