import React from 'react';
import { Link } from 'react-router-dom';
import styles from './welcome.module.css';

function Welcome () {
  return (
    <div>
      <nav>
        <Link to="/register">Register</Link> |<Link to="/login">Login</Link>
      </nav>
      <div className={styles.container}>
        <h1 className={styles.header}>Welcome to BigBrain!</h1>
      </div>
    </div>
  );
}

export default Welcome;
