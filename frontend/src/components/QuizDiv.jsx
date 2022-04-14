import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { apiCall, defaultImage } from '../components/Helper';
import styles from '../components/Style.module.css';
export default function QuizDiv (props) {
  const navigate = useNavigate();

  // handle quiz delete
  const deleteGame = () => {
    handleClose();
    apiCall(`admin/quiz/${props.quiz.id}`, 'DELETE', {});
    props.update(true);
  };
  // alert popup for quiz delete
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleEdit = () => {
    navigate('/quiz/' + props.quiz.id);
  };

  //   handle game start / stop
  const [clicked, setClicked] = React.useState(false);
  const [gameOn, setGameOn] = React.useState(props.quiz.active !== null);
  const [active, setActive] = React.useState(false);
  const [sessionID, setSessionID] = React.useState(0);
  const [stopDialog, setStopDialog] = React.useState(false);

  const handleGameOn = () => {
    setClicked(true);
    setGameOn(!gameOn);
  };
  React.useEffect(() => {
    if (gameOn && clicked) {
      setClicked(false);
      apiCall(`admin/quiz/${props.quiz.id}/start`, 'POST', {}).then(() => {
        apiCall(`admin/quiz/${props.quiz.id}`, 'GET', {}).then((data) => {
          setActive(true);
          setSessionID(data.active);
        }); // start a game, and get session ID
      });
    } else if (!gameOn && clicked) {
      setClicked(false);
      apiCall(`admin/quiz/${props.quiz.id}/end`, 'POST', {}).then(() => {
        setStopDialog(true); // show popup for stoping a game
      });
    }
  }, [gameOn]);

  //   copy to click board function
  const copyToClickboard = () => {
    const text = `http://localhost:3000/play/${sessionID}`;
    navigator.clipboard.writeText(text);
    setActive(false);
  };

  // calculate question information, display in the dashboard cards
  const calculateDuration = (questions) => {
    return questions.map((q) => q.duration).reduce((a, b) => a + b);
  };
  const calculateCredits = (questions) => {
    return questions.map((q) => q.credit).reduce((a, b) => a + b);
  };

  const [questionInfo, setQuestionInfo] = React.useState({});

  React.useEffect(() => {
    if (props.questions.length !== 0) {
      questionInfo.n = props.questions.length;
      setQuestionInfo({
        n: props.questions.length,
        duration: calculateDuration(props.questions),
        credits: calculateCredits(props.questions)
      });
    } else {
      setQuestionInfo({
        n: 0,
        duration: 0,
        credits: 0
      });
    }
  }, [props.questions]);

  // the quiz card content
  return (
    <>
      <Card className={`${styles.cardStyle} ${styles.space}`}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.quiz.name}
          </Typography>

          <p>Number of Questions : {questionInfo.n}</p>
          <p>Time Limit : {questionInfo.duration}</p>
          <p>Total Credits : {questionInfo.credits}</p>
        </CardContent>
        {props.quiz.thumbnail
          ? (
          <img
            src={props.quiz.thumbnail}
            width={200}
            height={120}
            alt="Quiz Thumbnail"
          />
            )
          : (
          <img
            src={defaultImage}
            width={200}
            height={120}
            alt="Quiz Thumbnail"
          />
            )}
        <CardActions>
          <Button
            size="small"
            variant="contained"
            color={gameOn ? 'error' : 'success'}
            onClick={handleGameOn}
          >
            {gameOn ? <>Stop</> : <>Start</>}
          </Button>

          <Button size="small" onClick={handleEdit}>
            Edit
          </Button>
          <Button size="small" color="error" onClick={handleClickOpen}>
            Delete
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
          {`Are you sure you want to delete the quiz: ${props.quiz.name.toUpperCase()}?`}
        </DialogTitle>

        <DialogActions>
          <Button onClick={deleteGame} autoFocus>
            Yes
          </Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for showing session ID */}
      <Dialog
        open={active}
        onClose={() => {
          setActive(false);
        }}
        aria-labelledby="game-start-dialog-title"
        aria-describedby="game-start-dialog-description"
      >
        <DialogTitle id="game-start-dialog-title">
          {`Quiz ${props.quiz.name.toUpperCase()} has started`}
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

      {/* Dialog for navigating to result page */}
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
    </>
  );
}
QuizDiv.propTypes = {
  quiz: PropTypes.object,
  // active: PropTypes.number,
  // quizId: PropTypes.number,
  // thumbnail: PropTypes.string,
  // name: PropTypes.string,
  questions: PropTypes.array,
  update: PropTypes.func
};
