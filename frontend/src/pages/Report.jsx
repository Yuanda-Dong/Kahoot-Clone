import React from 'react';
// import { apiCall } from '../components/Helper';
import { NavTabs } from '../components/NavTab';
import { useNavigate } from 'react-router-dom';

export default function Result () {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  });

  return (
    <>
      <NavTabs />
      <h1>This is a report page</h1>
    </>
  );
}
