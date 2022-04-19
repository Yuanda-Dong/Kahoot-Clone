import React from 'react';
import { NavTabLogin } from '../components/NavTab';
import WelcomeComp from '../components/WelcomeComp';

function Welcome () {
  return (
    <>
      <NavTabLogin />
      <WelcomeComp />
    </>
  );
}

export default Welcome;
