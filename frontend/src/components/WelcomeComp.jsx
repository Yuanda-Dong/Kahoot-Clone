import React from 'react';
import styles from './Style.module.css';

function WelcomeComp () {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.header}>Welcome to BigBrain!</h1>
      </div>
    </>
  );
}

export default WelcomeComp;
