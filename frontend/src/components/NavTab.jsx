import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { apiCall } from './Helper';

function LinkTab (props) {
  return <Tab component="a" {...props} />;
}

export function NavTabs () {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const logOut = () => {
    apiCall('admin/auth/logout', 'POST', {});
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="navigation bar">
        <LinkTab label="Dashboard" href="/dashboard" />
        <LinkTab label="Report" href="/report" />
        <LinkTab label="Log out" href="/login" onClick={logOut} />
      </Tabs>
    </Box>
  );
}

export function NavTabLogin () {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="navigation bar">
        <LinkTab label="Login" href="/login" />
        <LinkTab label="Register" href="/register" />
      </Tabs>
    </Box>
  );
}
