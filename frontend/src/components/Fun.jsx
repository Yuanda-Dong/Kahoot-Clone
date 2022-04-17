import React from 'react';
import styles from './Style.module.css';
import rabbit from './rabbit.png';
export default function Fun () {
  return (
    <div className={styles.fun}>
      <h1>Lobby </h1>

      <img
        src={rabbit}
        alt="rabbit image"
        // width={'60%'}
      />
      <p>Watch some funny cat videos while you are waiting</p>
      <ul>
        <li>
          <a href="https://www.youtube.com/watch?v=aFuUidBR1aQ">Cat Video 1</a>
        </li>
        <li>
          <a href="https://www.youtube.com/watch?v=tpiyEe_CqB4&t=17s">
            Cat Video 2
          </a>
        </li>
      </ul>
    </div>
  );
}
