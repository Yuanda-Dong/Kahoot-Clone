import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
export default function DropDown (props) {
  const handleChange = (event) => {
    props.handle(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120, mt: 1.5, mb: 1.5, width: 250 }}>
      <FormControl fullWidth>
        <InputLabel
          id={`${props.dropId}-label`}
        >{`${props.dropId}`}</InputLabel>
        <Select
          labelId={`${props.dropId}-label`}
          id={`${props.dropId}`}
          value={props.target}
          label={`${props.dropId}`}
          onChange={handleChange}
        >
          {props.options.map((e) => {
            return (
              <MenuItem key={e} value={e}>
                {e}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

DropDown.propTypes = {
  dropId: PropTypes.string,
  options: PropTypes.array,
  target: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handle: PropTypes.func
};
