import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { apiCall } from '../components/Helper';
export default function QuizDiv (props) {
  const deleteGame = () => {
    handleClose();
    apiCall(`admin/quiz/${props.quizId}`, 'DELETE', {});
    props.update(true);
  };

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleEdit = () => {
    navigate('/quiz/' + props.quizId);
  };

  //   copy to click board function
  const copyToClickboard = () => {
    const text = `/play/${sessionID}`;
    navigator.clipboard.writeText(text);
    getSessionID(0);
  };

  //   handle game start / stop
  const [clicked, setClicked] = React.useState(false);
  const [gameOn, setGameOn] = React.useState(props.active !== null);
  const [sessionID, getSessionID] = React.useState(0);
  const [stopDialog, setStopDialog] = React.useState(false);

  const handleGameOn = () => {
    setClicked(true);
    setGameOn(!gameOn);
  };
  React.useEffect(() => {
    if (gameOn && clicked) {
      setClicked(false);
      apiCall(`admin/quiz/${props.quizId}/start`, 'POST', {}).then(() => {
        apiCall(`admin/quiz/${props.quizId}`, 'GET', {}).then((data) => {
          getSessionID(data.active);
        });
      });
    } else if (!gameOn && clicked) {
      setClicked(false);
      apiCall(`admin/quiz/${props.quizId}/end`, 'POST', {}).then(() => {
        setStopDialog(true); // show popup for stoping a game
      });
    }
  }, [gameOn]);

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          alt={`thumbnail for quiz: ${props.name}`}
          height="140"
          image={props.thumbnail}
        />
        <CardActions>
          <Button size="small" color="error" onClick={handleClickOpen}>
            Delete
          </Button>
          <Button size="small" onClick={handleEdit}>
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={gameOn ? 'error' : 'success'}
            onClick={handleGameOn}
          >
            {gameOn ? <>Stop</> : <>Start</>}
          </Button>
        </CardActions>
      </Card>

      {/* alert dialog for deleteing a quiz */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to delete the quiz: ${props.name.toUpperCase()}?`}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={deleteGame} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for showing session ID */}

      <Dialog
        open={sessionID !== 0}
        onClose={() => {
          getSessionID(0);
        }}
        aria-labelledby="game-start-dialog-title"
        aria-describedby="game-start-dialog-description"
      >
        <DialogTitle id="game-start-dialog-title">
          {`Quiz ${props.name.toUpperCase()} has started`}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="game-start-dialog-description">
            Session ID: {sessionID}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={copyToClickboard}>
            Copy Link
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={stopDialog}
        onClose={() => setStopDialog(false)}
        aria-labelledby="game-stop-dialog-title"
      >
        <DialogTitle id="game-stop-dialog-title">
          {'Would you like to view the results?'}
        </DialogTitle>

        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              navigate('/result/' + sessionID);
            }}
          >
            Yes
          </Button>
          <Button autoFocus onClick={() => setStopDialog(false)}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
QuizDiv.propTypes = {
  active: PropTypes.number,
  quizId: PropTypes.number,
  thumbnail: PropTypes.string,
  name: PropTypes.string,
  update: PropTypes.func
};
