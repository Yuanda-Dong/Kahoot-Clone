import * as React from 'react';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import styles from './Style.module.css';

const colorPalette = [
  '#e4e9be',
  '#95d1cc',
  '#8d8daa',
  '#c69b7b',
  '#a2d5ab',
  '#fdd7aa'
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  cursor: 'pointer'
}));

export default function GameDisplay () {
  const [time, setTime] = React.useState(10);
  const counter = React.useRef();

  React.useEffect(() => {
    counter.current = window.setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
    return () => clearInterval(counter.current);
  }, []);
  React.useEffect(() => {
    if (time <= 0) {
      clearInterval(counter.current);
    }
  }, [time]);

  return (
    <>
      <Chip label="Player Name" />
      <p>
        Timer: {time} Credit: {'🪙'.repeat(5)}
      </p>
      <h1>Question Title is here</h1>

      <Box className={styles.pageAlign}>
        <img src="data:image/jpeg;base64,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"></img>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          className={styles.marginQuestion}
        >
          {Array.from(Array(6)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item sx={{ backgroundColor: colorPalette[index] }}>HAHAHA</Item>
            </Grid>
          ))}
        </Grid>
        <Button
          disabled={time === 0}
          size="large"
          color="success"
          variant="outlined"
        >
          Submit
        </Button>
      </Box>
    </>
  );
}
