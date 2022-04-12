import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function QuestionCard () {
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Question Title
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Question Content
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          alt="question media"
          height="100"
          image="#"
        />
        <CardActions>
          <Button size="small" color="error">
            Delete
          </Button>
          <Button size="small">Edit</Button>
        </CardActions>
      </Card>
    </>
  );
}
