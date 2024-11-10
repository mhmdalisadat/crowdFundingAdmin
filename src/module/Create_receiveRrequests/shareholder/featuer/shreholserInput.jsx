/* eslint-disable no-return-assign */
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const ShareholderInput = ({ sectionIndex, section, handleChange }) => (
  <>
    <TextField
      id={`name-${sectionIndex}`}
      label="نام و نام خانوادگی"
      variant="outlined"
      fullWidth
      sx={{ mb: 2 }}
      value={section.name}
      onChange={(e) => handleChange(sectionIndex, 'name', e.target.value)}
    />
    <TextField
      type="text"
      name="national_code"
      inputProps={{ maxLength: 10 }}
      onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
      required
      id={`national-code-${sectionIndex}`}
      label="کد ملی"
      variant="outlined"
      fullWidth
      sx={{ mb: 2 }}
      value={section.national_code}
      onChange={(e) => handleChange(sectionIndex, 'national_code', e.target.value)}
    />

<TextField
      type="number"
      required
      inputProps={{
        step: '0.1',
        min: 0,
        max: 100,
      }}
      name="percent"
      id={`percent-${sectionIndex}`}
      label="تعداد سهام"
      variant="outlined"
      fullWidth
      sx={{ mb: 2 }}
      value={section.percent}
      onChange={(e) => {
        handleChange(sectionIndex, 'percent',e.target.value );
      }}
    />
    <TextField
      type="text"
      name="phone"
      inputProps={{ maxLength: 10 }}
      onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
      required
      id={`phone-${sectionIndex}`}
      label="شماره تلفن"
      variant="outlined"
      fullWidth
      sx={{ mb: 2 }}
      value={section.phone}
      onChange={(e) => handleChange(sectionIndex, 'phone', e.target.value)}
    />
   
  </>
);
ShareholderInput.propTypes = {
  handleChange: PropTypes.func,
  sectionIndex: PropTypes.number,
  section: PropTypes.object,
};
export default ShareholderInput;
