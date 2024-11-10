import { Box, Button, FormControl, FormLabel, Input, Switch, Typography } from '@mui/material';
import { OnRun } from 'src/api/OnRun';
import PropTypes from 'prop-types';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';

const Logo = ({ setLocalData, localData, handleFileRemove }) => (
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
        color: '#424242',
        fontWeight: 'bold',
        borderBottom: '1px solid #e0e0e0',
        paddingBottom: '16px',
      }}
    >
      لوگو شرکت
    </Typography>
    <FormControl fullWidth sx={{ mb: 2 }}>
      <FormLabel sx={{ color: '#424242', fontSize: '14px', fontWeight: 'medium' }}>
        فایل لوگو
        <Switch
          name="Lock_logo"
          inputProps={{ 'aria-label': 'controlled' }}
          sx={{ ml: 1 }}
          checked={localData.Lock_logo?? false}
          onChange={(e) => setLocalData({ ...localData, Lock_logo: e.target.checked })}
        />
      </FormLabel>
      {localData.logo ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f7f7f7',
            p: 2,
            borderRadius: '8px',
            boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
            mt: 1,
          }}
        >       
          <a
              href={`${OnRun}/${localData.logo}`}
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
          <Button onClick={() => handleFileRemove('logo')}>حذف فایل</Button>
        </Box>
      ) : (
        <Input
          type="file"
          sx={{
            mt: 1,
            borderRadius: '8px',
            width: '100%',
            color: '#424242',
            '&:focus': {
              outline: 'none',
              borderColor: '#3f51b5',
              boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
            },
          }}
          onChange={(e) => {
            const file = e.target.files[0];
            setLocalData({ ...localData, logo: file });
          }}
        />
      )}
    </FormControl>
  </Box>
);

Logo.propTypes = {
  localData: PropTypes.object,
  setLocalData: PropTypes.func,
  handleFileRemove: PropTypes.func,
};

export default Logo;
