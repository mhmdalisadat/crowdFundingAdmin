import { useState } from 'react';
import { Box, Typography, Grid, Alert } from '@mui/material';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';
import { SubmitButton } from 'src/components/button';
import EndOffUndraisingPage from './endoffundraising';

const EndOffUndraisingDate = () => {
  const [showEndPage, setShowEndPage] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState(false);

  const handleButtonClick = () => {
    if (selectedDate) {
      setShowEndPage(true);
    } else {
      setError(true);
    }
  };

  if (showEndPage) {
    return <EndOffUndraisingPage />;
  }

  return (
    <Box
      sx={{
        width: '100%',
        p: 3,
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Box className="bg-gray-100 text-center py-4 rounded-t-lg">
          <Typography variant="h5" component="h1" className="text-gray-700 font-bold">
            پایان جمع‌آوری وجه
          </Typography>
        </Box>

        <Grid item xs={12} sm={6} md={6} mt={5} mb={10}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
            تاریخ پایان:
          </Typography>
          <DatePicker
            format="YYYY/MM/DD"
            calendar={persian}
            locale={persian_fa}
            value={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setError(false);
            }}
            style={{
              minWidth: '30em',
              height: '55px',
              padding: '15px',
              borderRadius: '8px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            }}
          />
        </Grid>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            لطفاً تاریخ پایان را وارد کنید.
          </Alert>
        )}
      </div>

      <Box>
        <SubmitButton onClick={handleButtonClick} />
      </Box>
    </Box>
  );
};

export default EndOffUndraisingDate;
