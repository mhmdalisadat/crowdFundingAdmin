import { Box, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';

const ValidationInput = ({ item, setFormData, index, handleTextFieldChange }) => {
  
  const handleDateChange = (date) => {
    const jsDate = date && typeof date.toDate === 'function' ? date.toDate() : null;
    const updatedItem = { ...item, date: jsDate ? jsDate.toISOString() : null };
    
    setFormData((prevData) => {
      const newData = [...prevData];
      newData[index] = updatedItem;
      return newData;
    });
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
        gap: 2,
        marginBottom: 2,
      }}
    >
      <TextField
        value={item.name || ''}
        label="نام"
        variant="outlined"
        fullWidth
        onChange={handleTextFieldChange(index, 'name')}
        disabled
      />
      <TextField
        value={item.national_code || ''}
        label="کد ملی"
        variant="outlined"
        fullWidth
        onChange={handleTextFieldChange(index, 'national_code')}
        disabled
      />
      <DatePicker
        style={{
          width: '100%',
          padding: 16,
          backgroundColor: '#ffffff',
          marginTop: '12px',
        }}
        value={item.date ? new Date(item.date) : null}
        onChange={handleDateChange}
        calendar={persian}
        locale={persian_fa}
        className="shadow appearance-none border bg-white border-gray-300 rounded-lg w-full text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
      />
    </Box>
  );
};

ValidationInput.propTypes = {
  handleTextFieldChange: PropTypes.func,
  index: PropTypes.number,
  item: PropTypes.object,
  setFormData: PropTypes.func,
};

export default ValidationInput;
