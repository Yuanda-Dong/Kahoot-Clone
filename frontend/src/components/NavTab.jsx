import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { apiCall } from './Helper';
import { useLocation, useNavigate } from 'react-router-dom';

export function NavTabLogin () {
  const navigate = useNavigate();
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
        <Tabs value={value} aria-label="navigation bar" textColor="inherit">
          <Tab id="TabLogin" label="Login" onClick={() => navigate('/login')} />
          <Tab
            id="TabRegister"
            label="Register"
            onClick={() => navigate('/register')}
          />
        </Tabs>
      </Box>
    </Box>
  );
}

export function NavTabs () {
  const navigate = useNavigate();
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
  }

  const logOut = () => {
    apiCall('admin/auth/logout', 'POST', {});
    navigate('/');
    localStorage.clear();
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} aria-label="navigation bar">
          <Tab
            id="TabDashboard"
            label="Dashboard"
            onClick={() => navigate('/dashboard')}
          />
          <Tab
            id="TabReport"
            label="Report"
            onClick={() => navigate('/report')}
          />
          <Tab id="TabLogout" label="Logout" onClick={logOut} />
        </Tabs>
      </Box>
    </Box>
  );
}
