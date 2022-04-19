import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import Box from '@mui/material/Box';
import { shallow } from 'enzyme';

describe('RegisterForm', () => {
  it('displays a form for register', () => {
    const wrapper = shallow(
      <Router>
        <RegisterForm />
      </Router>
    );
    expect(wrapper.find(RegisterForm)).toHaveLength(1);
  });
});
