import React from 'react';
import { NavTabs } from './components/NavTab';
import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom';
import { shallow } from 'enzyme';

describe('NavTabs', () => {
  it('should render a list of 3 tabs', () => {
    const wrapper = shallow(<NavTabs />);
    expect(wrapper.find(Tab)).toHaveLength(3);
  });

  it('should have a tab for dashboard', () => {
    const wrapper = shallow(<NavTabs />);
    const dashboard = wrapper.find(Link).find('[role="dashboard"]');
    // const dashboard = wrapper.findWhere((n) => n.prop('label') === 'Dashboard');
    expect(dashboard.props().to).toBe('/dashboard');
  });
  it('should have a tab for dashboard', () => {
    const wrapper = shallow(<NavTabs />);
    const dashboard = wrapper.find(Link).find('[role="report"]');
    // const dashboard = wrapper.findWhere((n) => n.prop('label') === 'Dashboard');
    expect(dashboard.props().to).toBe('/report');
  });
  it('should have a tab for dashboard', () => {
    const wrapper = shallow(<NavTabs />);
    const dashboard = wrapper.find(Link).find('[role="logout"]');
    // const dashboard = wrapper.findWhere((n) => n.prop('label') === 'Dashboard');
    expect(dashboard.props().to).toBe('/');
  });

  // it('should have a tab for report', () => {
  //   const wrapper = shallow(<NavTabs />);
  //   const report = wrapper.findWhere((n) => n.prop('label') === 'Report');
  //   expect(report.props().href).toBe('/report');
  // });

  // it('should have a tab for logout and navigate to welcome page', () => {
  //   const wrapper = shallow(<NavTabs />);
  //   const logout = wrapper.findWhere((n) => n.prop('label') === 'Logout');
  //   expect(logout.props().href).toBe('/');
  // });
});
