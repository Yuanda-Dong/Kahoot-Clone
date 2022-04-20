import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { apiCall } from './Helper';

function loginTabProps (index) {
  return {
    id: `login-tab-${index}`,
    'aria-controls': `login-tabpanel-${index}`
  };
}

export function NavTabLoginTest () {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={false} aria-label="login page navbar">
          <Tab label="Login" {...loginTabProps(0)} href="/login" />
          <Tab label="Register" {...loginTabProps(1)} href="/register" />
        </Tabs>
      </Box>
    </Box>
  );
}

function homeTabProps (index) {
  return {
    id: `home-tab-${index}`,
    'aria-controls': `home-tabpanel-${index}`
  };
}

export function NavTabsTest () {
  const logOut = () => {
    apiCall('admin/auth/logout', 'POST', {});
    localStorage.clear();
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={false} aria-label="homepage navbar">
          <Tab label="Dashboard" {...homeTabProps(0)} href="/dashboard" />
          <Tab label="Report" {...homeTabProps(1)} href="/report" />
          <Tab label="Logout" {...homeTabProps(1)} href="/" onClick={logOut} />
        </Tabs>
      </Box>
    </Box>
  );
}
