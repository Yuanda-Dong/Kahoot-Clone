import * as React from 'react';
import PropTypes from 'prop-types';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import styles from './Style.module.css';

// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import DraftsIcon from '@mui/icons-material/Drafts';
// import SendIcon from '@mui/icons-material/Send';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
// import StarBorder from '@mui/icons-material/StarBorder';

export default function ReportList (props) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="report-list-by-quiz-name"
    >
      <ListSubheader className={styles.reportNav} onClick={handleClick}>
        <ListItemText primary={props.quiz.name} />
      </ListSubheader>
      {props.quiz.oldSessions.map((session, idx) => {
        return (
          <Collapse key={idx} in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                onClick={() => props.getReport([session, props.quiz.id])}
                sx={{ pl: 4 }}
              >
                <ListItemText primary={`Session: ${session}`} />
              </ListItemButton>
            </List>
          </Collapse>
        );
      })}
    </List>
  );
}

ReportList.propTypes = {
  quiz: PropTypes.object,
  getReport: PropTypes.func
};
