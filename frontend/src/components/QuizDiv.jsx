import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { apiCall } from '../components/Helper';

export default function QuizDiv (props) {
  const deleteGame = () => {
    apiCall(`/admin/quiz/${props.userId}`, 'DELETE', {});
  };

  return (
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
        <Button size="small" color="error" onClick={deleteGame}>
          Delete
        </Button>
        <Button size="small">Edit</Button>
      </CardActions>
    </Card>
  );
}

QuizDiv.propTypes = {
  userId: PropTypes.number,
  thumbnail: PropTypes.string,
  name: PropTypes.string
};
