import React from 'react';
import styles from './welcome.module.css';
import { NavTabLogin } from '../components/NavTab';

function Welcome () {
  return (
    <>
      <NavTabLogin />
      <div className={styles.container}>
        <h1 className={styles.header}>Welcome to BigBrain!</h1>
      </div>
    </>
  );
}

export default Welcome;
