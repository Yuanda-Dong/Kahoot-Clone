import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom';
import styles from './Style.module.css';

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
          <Link role={'login'} className={styles.link} to="/login">
            <Tab label="Login" {...loginTabProps(0)} />
          </Link>
          <Link role={'register'} className={styles.link} to="/register">
            <Tab label="Register" {...loginTabProps(1)} />
          </Link>
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
          <Link role={'dashboard'} className={styles.link} to="/dashboard">
            <Tab label="Dashboard" {...homeTabProps(0)} />
          </Link>
          <Link role={'report'} className={styles.link} to="/report">
            <Tab label="Report" {...homeTabProps(1)} />
          </Link>
          <Link role={'logout'} className={styles.link} to="/">
            <Tab label="Logout" {...homeTabProps(1)} onClick={logOut} />
          </Link>
        </Tabs>
      </Box>
    </Box>
  );
}
