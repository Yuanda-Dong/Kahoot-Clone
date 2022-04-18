import React from 'react';
import { useParams } from 'react-router-dom';
import { apiCall } from '../components/Helper';
import GameDisplay from '../components/GameDisplay';
import PlayerResult from '../components/PlayerResult';
import styles from '../components/Style.module.css';
import Fun from '../components/Fun';

export default function PlayGame () {
  const params = useParams();
  // const sessionID = params.sessionID;
  const [playerName, playerID] = params.player.split('=');
  const [question, setQuestion] = React.useState({});
  const [started, setStarted] = React.useState(false);
  const [result, setResult] = React.useState({});
  const intv = React.useRef();

  const managePage = () => {
    apiCall(`play/${playerID}/status`, 'GET', {}).then((data) => {
      if (data.error) {
        setStarted(false);

        apiCall(`play/${playerID}/results`, 'GET', {}).then((data) => {
          if (!data.error) {
            setResult(data);
          }
          // game session is finished, get the result
          clearInterval(intv.current);
        });
      } else {
        setStarted(data.started);
        if (data.started) {
          apiCall(`play/${playerID}/question`, 'GET', {}).then((data) => {
            if (data.error) {
              alert(data.error);
              setQuestion({});
            } else {
              setQuestion(data);
            }
          });
        } else {
          setStarted(false);
        }
      }
    });
  };
  console.log(result);

  React.useEffect(() => {
    // managePage();
    intv.current = setInterval(() => {
      managePage();
    }, 500);
    return () => clearInterval(intv.current);
  }, []);

  return (
    <div className={styles.pageAlign}>
      {!started && Object.keys(result).length === 0 && <Fun />}
      {started && Object.keys(question).length > 0 && (
        <GameDisplay
          question={question.question}
          playerName={playerName}
          playerID={playerID}
        />
      )}
      {Object.keys(result).length > 0 && (
        <PlayerResult result={result} playerName={playerName} />
      )}
    </div>
  );
}
