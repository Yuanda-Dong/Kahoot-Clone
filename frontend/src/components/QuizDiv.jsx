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

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
        </CardContent>
        <CardMedia
          component="img"
          alt="quiz image"
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
        </CardActions>
      </Card>

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
    </div>
  );
}

QuizDiv.propTypes = {
  quizId: PropTypes.number,
  thumbnail: PropTypes.string,
  name: PropTypes.string,
  update: PropTypes.func
};
