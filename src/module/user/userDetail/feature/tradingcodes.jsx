import { Box, TextField, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import useGetUserDetail from '../service/useGetUserDetail';

const TradingCodes = () => {
  const { userId } = useParams();
  const { data } = useGetUserDetail(userId);
  const fields = [
    { label: 'شناسه', value: (item) => item.id },
    { label: 'کد', value: (item) => item.code || 'ندارد' },
    { label: 'قسمت اول', value: (item) => item.firstPart || 'ندارد' },
    { label: 'قسمت دوم', value: (item) => item.secondPart || 'ندارد' },
    { label: 'قسمت سوم', value: (item) => item.thirdPart || 'ندارد' },
    { label: 'نوع', value: (item) => item.type || 'ندارد' },
    { label: 'کاربر', value: (item) => item.user || 'ندارد' },
  ];

  const renderTextField = (label, value) => (
    <TextField
      label={label}
      value={value}
      fullWidth
      variant="outlined"
      InputProps={{ readOnly: true }}
      sx={{
        mb: 2,
        backgroundColor: '#f5f5f5',
        borderRadius: 1,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#ccc',
          },
          '&:hover fieldset': {
            borderColor: '#888',
          },
        },
      }}
    />
  );

  return (
    <Box sx={{ p: 3 }}>
      {data?.trading_codes?.map((item, index) => (
        <Box
          key={index}
          mb={3}
          sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1, backgroundColor: '#fafafa' }}
        >
          <Grid container spacing={2}>
            {fields.map(({ label, value }, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                {renderTextField(label, value(item))}
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default TradingCodes;
