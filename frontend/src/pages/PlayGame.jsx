import React from 'react';
import { useParams } from 'react-router-dom';
// import { apiCall } from '../components/Helper';
import GameDisplay from '../components/GameDisplay';

export default function PlayGame () {
  const params = useParams();
  const sessionID = params.sessionID;
  const [playerName, playerID] = params.player.split('=');
  //   const [questions, setQuestions] = React.useState([]);
  //   const [status, setStatus] = React.useState('');
  console.log(sessionID + playerName + playerID);
  //   const navigate = useNavigate();
  //   React.useEffect(() => {
  //     apiCall(`play/${playerID}/status`, 'GET', {}).then((data) => {
  //       if (data.error) {
  //         alert(data.error);
  //       } else {
  //         setStatus(data.status);
  //       }
  //     });

  //     apiCall(`play/${playerID}/question`, 'GET', {}).then((data) => {
  //       if (data.error) {
  //         alert(data.error);
  //       } else {
  //         setQuestions(data.questions);
  //       }
  //     });
  //   }, []);

  //   console.log(questions);
  //   console.log(status);

  return (
    <>
      <h1>This is the Game page</h1>
      <GameDisplay />
    </>
  );
}
