import React from 'react';
import { NavTabsTest } from './components/NavTabTest';
import Tab from '@mui/material/Tab';
import { shallow } from 'enzyme';

describe('NavTabsTest', () => {
  it('should render a list of 3 tabs', () => {
    const wrapper = shallow(<NavTabsTest />);
    expect(wrapper.find(Tab)).toHaveLength(3);
  });

  it('should have a tab for dashboard', () => {
    // const dashboard = shallow(<NavTabs />);
    //   .find(Tab)
    //   .find('[label="Dashboard"]');
    const wrapper = shallow(<NavTabsTest />);
    const dashboard = wrapper.findWhere((n) => n.prop('label') === 'Dashboard');
    expect(dashboard.props().href).toBe('/dashboard');
  });

  it('should have a tab for report', () => {
    const wrapper = shallow(<NavTabsTest />);
    const report = wrapper.findWhere((n) => n.prop('label') === 'Report');
    expect(report.props().href).toBe('/report');
  });

  it('should have a tab for logout and navigate to welcome page', () => {
    const wrapper = shallow(<NavTabsTest />);
    const logout = wrapper.findWhere((n) => n.prop('label') === 'Logout');
    expect(logout.props().href).toBe('/');
  });
});
