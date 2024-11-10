import { Box, TextField, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import useGetUserDetail from '../service/useGetUserDetail';

const Addresses = () => {
  const { userId } = useParams();
  const { data } = useGetUserDetail(userId);

  const fields = [
    { label: 'شهر', value: (item) => item.city },
    { label: 'استان', value: (item) => item.province },
    { label: 'کشور', value: (item) => item.country },
    { label: 'خیابان', value: (item) => item.alley },
    { label: 'پلاک', value: (item) => item.plaque },
    { label: 'کد پستی', value: (item) => item.postalCode },
    { label: 'تلفن', value: (item) => item.tel },
    { label: 'موبایل', value: (item) => item.mobile },
    { label: 'ایمیل', value: (item) => item.email },
    { label: 'شماره تلفن اضطراری', value: (item) => item.emergencyTel },
    { label: 'پیش‌شماره تلفن شهر', value: (item) => item.emergencyTelCityPrefix },
    { label: 'پیش‌شماره کشور', value: (item) => item.emergencyTelCountryPrefix },
    { label: 'آدرس باقی‌مانده', value: (item) => item.remnantAddress },
    { label: 'بخش', value: (item) => item.section },
    { label: 'وب‌سایت', value: (item) => item.website || 'ندارد' },
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
      {data?.addresses?.map((item, index) => (
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

export default Addresses;
