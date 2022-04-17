import React from 'react';
import { useParams } from 'react-router-dom';
import { apiCall } from '../components/Helper';
import GameDisplay from '../components/GameDisplay';
import PlayerResult from '../components/PlayerResult';
import Fun from '../components/Fun';

export default function PlayGame () {
  const params = useParams();
  // const sessionID = params.sessionID;
  const [playerName, playerID] = params.player.split('=');
  const [question, setQuestion] = React.useState({});
  const [started, setStarted] = React.useState(false);
  const [result, setResult] = React.useState({});

  const managePage = () => {
    apiCall(`play/${playerID}/status`, 'GET', {}).then((data) => {
      if (data.error) {
        setStarted(false);
        apiCall(`play/${playerID}/results`, 'GET', {}).then((data) => {
          if (!data.error) {
            setResult(data);
          }
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
        }
      }
    });
  };

  React.useEffect(() => {
    managePage();
    const intv = setInterval(() => {
      managePage();
    }, 500);
    return () => clearInterval(intv);
  }, []);

  return (
    <>
      <h1>This is the Game page</h1>
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
    </>
  );
}
