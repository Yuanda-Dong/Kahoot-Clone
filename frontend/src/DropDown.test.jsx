import React from 'react';
import DropDown from './components/DropDown';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Experimental_CssVarsProvider } from '@mui/material';

describe('DropDown', () => {
  const props = {
    dropId: '123',
    options: [1, 2, 3],
    target: 3,
    handle: jest.fn()
  };

  it('displays a dropdown box', () => {
    const wrapper = shallow(<DropDown {...props} />);
    expect(wrapper.find(Box)).toHaveLength(1);
  });

  it('has an input label with given id', () => {
    const wrapper = shallow(<DropDown {...props} />);
    expect(wrapper.find(InputLabel).props().children).toBe('123');
  });

  it('it has 3 options ', () => {
    const wrapper = shallow(<DropDown {...props} />);
    expect(wrapper.find(MenuItem)).toHaveLength(3);
  });

  it('has options which has value matched with props ', () => {
    const wrapper = shallow(<DropDown {...props} />);
    expect(wrapper.find(MenuItem).at(0).props().children).toBe(1);
  });

  it('it has 1 as defualt value ', () => {
    const wrapper = shallow(<DropDown {...props} />);
    const select = wrapper.find(Select);
    expect(select.props().value).toBe(3);
  });

  it('it calls function when on change ', () => {
    const wrapper = shallow(<DropDown {...props} />);
    const select = wrapper.find(Select);
    select.simulate('change', { target: 1 });
    expect(props.handle).toHaveBeenCalledTimes(1);
  });
});
