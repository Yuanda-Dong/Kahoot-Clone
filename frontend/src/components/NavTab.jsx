import * as React from 'react';
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

export function NavTabLogin () {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={false} aria-label="basic tabs example">
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

export function NavTabs () {
  const logOut = () => {
    localStorage.clear();
    apiCall('admin/auth/logout', 'POST', {});
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={false} aria-label="basic tabs example">
          <Tab
            index={0}
            label="Dashboard"
            {...homeTabProps(0)}
            href="/dashboard"
          />
          <Tab index={1} label="Report" {...homeTabProps(1)} href="/report" />
          <Tab
            index={2}
            label="Logout"
            {...homeTabProps(1)}
            href="/"
            onClick={logOut}
          />
        </Tabs>
      </Box>
    </Box>
  );
}
