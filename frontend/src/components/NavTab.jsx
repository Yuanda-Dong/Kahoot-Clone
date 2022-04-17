import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { apiCall } from './Helper';
import { useLocation } from 'react-router-dom';
export function NavTabs () {
  const location = useLocation();
  const pathname = location.pathname;
  let value = false;
  switch (pathname) {
    case '/dashboard':
      value = 0;
      break;
    case '/report':
      value = 1;
      break;
    case '/logout':
      value = 2;
      break;
  }

  const logOut = () => {
    localStorage.clear();
    apiCall('admin/auth/logout', 'POST', {});
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} aria-label="navigation bar" textColor="inherit">
          <Tab label="Dashboard" href="/dashboard" />
          <Tab label="Report" href="/report" />
          <Tab label="Log out" href="/" onClick={logOut} />
        </Tabs>
      </Box>
    </Box>
  );
}

export function NavTabLogin () {
  const location = useLocation();
  const pathname = location.pathname;
  let value = false;

  switch (pathname) {
    case '/login':
      value = 0;
      break;
    case '/register':
      value = 1;
      break;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} aria-label="navigation bar">
          <Tab label="Login" href="/login" />
          <Tab label="Register" href="/register" />
        </Tabs>
      </Box>
    </Box>
  );
}
