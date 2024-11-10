import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import PropTypes from 'prop-types';

const SelectField = ({
  id,
  label,
  value,
  onChange,
  options,
  helperText,
  required = false,
  error = false,
  ...props
}) => (
  <FormControl fullWidth sx={{ mb: 2 }} required={required} error={error}>
    <InputLabel id={`${id}-label`}>{label}</InputLabel>
    <Select
      labelId={`${id}-label`}
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      {...props}
    >
      {options.map(({ value: optionValue, label: optionLabel }) => (
        <MenuItem key={optionValue} value={optionValue}>
          {optionLabel}
        </MenuItem>
      ))}
    </Select>
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);

SelectField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.string,
    })
  ),
  helperText: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.bool,
};

export default SelectField;
