import React from 'react';
import Fun from './components/Fun';
import rabbit from './components/rabbit.png';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
describe('Fun', () => {
  it('should have links to relaxing cat video', () => {
    const { getByText } = render(<Fun />);
    expect(getByText('Cat Video 1').closest('a')).toHaveAttribute(
      'href',
      'https://www.youtube.com/watch?v=M5PbLfVGOQs'
    );
  });

  it('should have links to relaxing cat video', () => {
    const { getByText } = render(<Fun />);
    expect(getByText('Cat Video 2').closest('a')).toHaveAttribute(
      'href',
      'https://www.youtube.com/watch?v=tpiyEe_CqB4'
    );
  });

  it('should have a relaxing image', () => {
    const wrapper = shallow(<Fun />);
    expect(wrapper.find('img').prop('src')).toEqual(rabbit);
  });
});
