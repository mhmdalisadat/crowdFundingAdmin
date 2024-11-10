import { Box, Button, FormControl, FormLabel, Input, Switch, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { OnRun } from 'src/api/OnRun';

const ColumnsThisyear = ({ setLocalData, localData, handleFileRemove }) => {
  const handleSwitchChange = (e) => {
    setLocalData({
      ...localData,
      Lock_alignment_6columns_thisyear: e.target.checked,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLocalData({
      ...localData,
      alignment_6columns_thisyear: file,
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '24px',
        width: { xs: '100%', sm: '48%' },
        border: '1px solid #ccc',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          marginBottom: '16px',
          textAlign: 'center',
          fontWeight: 'bold',
          borderBottom: '1px solid #e0e0e0',
          paddingBottom: '16px',
        }}
      >
        گزارشات و مستندات به روز
      </Typography>

      <FormControl fullWidth>
        <FormLabel
          sx={{
            fontSize: '14px',
            fontWeight: 'medium',
            display: 'block',
            marginBottom: '8px',
          }}
        >
          تراز 6 ستونی
          <Switch
            name="Lock_alignment_6columns_thisyear"
            inputProps={{ 'aria-label': 'controlled' }}
            sx={{ marginLeft: '8px' }}
            checked={localData.Lock_alignment_6columns_thisyear ?? false}
            onChange={handleSwitchChange}
          />
        </FormLabel>
        {localData.alignment_6columns_thisyear ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#f7f7f7',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
              marginTop: '10px',
            }}
          >
            <a
              href={`${OnRun}/${localData.alignment_6columns_thisyear}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '14px',
                fontWeight: 'medium',
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                '&:hover': {
                  color: '#d32f2f',
                },
              }}
            >
              مشاهده فایل بارگذاری شده
              <FileCopyOutlinedIcon sx={{ fontSize: '16px', marginLeft: '4px' }} />
            </a>
            <Button onClick={() => handleFileRemove('alignment_6columns_thisyear')}>
              حذف فایل
            </Button>
          </Box>
        ) : (
          <Input
            type="file"
            sx={{
              marginTop: '8px',
              borderRadius: '8px',
              width: '100%',
              color: '#424242',
              '&:focus': {
                outline: 'none',
                borderColor: '#3f51b5',
                boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
              },
            }}
            onChange={handleFileChange}
          />
        )}
      </FormControl>
    </Box>
  );
};

ColumnsThisyear.propTypes = {
  localData: PropTypes.object,
  setLocalData: PropTypes.func,
  handleFileRemove: PropTypes.func,
};

export default ColumnsThisyear;
