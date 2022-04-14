import React from 'react';
import { useParams } from 'react-router-dom';

export default function PlayGame () {
  const params = useParams();
  const sessionID = params.sessionID;
  // const name = params.player;
  console.log(sessionID);
  //   const navigate = useNavigate();
  return (
    <>
      <h1>This is the Game page</h1>
    </>
  );
}
