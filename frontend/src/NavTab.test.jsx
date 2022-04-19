import React from 'react';
import Welcome from './pages/Welcome';
import { NavTabs } from './components/NavTab';
import Tab from '@mui/material/Tab';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

describe('NavTabs', () => {
  it('should render a list of 3 tabs', () => {
    const wrapper = shallow(<NavTabs />);
    expect(wrapper.find(Tab)).toHaveLength(3);
  });

  it('should have a tab for dashboard', () => {
    // const dashboard = shallow(<NavTabs />);
    //   .find(Tab)
    //   .find('[label="Dashboard"]');
    const wrapper = shallow(<NavTabs />);
    const dashboard = wrapper.findWhere((n) => n.prop('label') === 'Dashboard');
    expect(dashboard.props().href).toBe('/dashboard');
  });

  it('should have a tab for report', () => {
    const wrapper = shallow(<NavTabs />);
    const report = wrapper.findWhere((n) => n.prop('label') === 'Report');
    expect(report.props().href).toBe('/report');
  });

  it('should have a tab for logout and navigate to welcome page', () => {
    const wrapper = shallow(<NavTabs />);
    const logout = wrapper.findWhere((n) => n.prop('label') === 'Logout');
    expect(logout.props().href).toBe('/');
  });
});

// test('Welcome Page content', () => {
//   render(<Welcome />);
//   const linkElement = screen.getByText(/Welcome to BigBrain!/i);
//   expect(linkElement).toBeInTheDocument();
// });
