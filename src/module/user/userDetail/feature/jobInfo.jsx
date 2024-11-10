import { Box, TextField, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import useGetUserDetail from '../service/useGetUserDetail';

const JobInfo = () => {
  const { userId } = useParams();
  const { data } = useGetUserDetail(userId);

  const fields = [
    { label: 'آدرس شرکت', value: (item) => item.companyAddress },
    { label: 'پیش‌شماره تلفن شرکت', value: (item) => item.companyCityPrefix },
    { label: 'ایمیل شرکت', value: (item) => item.companyEmail || 'ندارد' },
    { label: 'فکس شرکت', value: (item) => item.companyFax || 'ندارد' },
    { label: 'پیش‌شماره فکس', value: (item) => item.companyFaxPrefix || 'ندارد' },
    { label: 'نام شرکت', value: (item) => item.companyName || 'ندارد' },
    { label: 'تلفن شرکت', value: (item) => item.companyPhone || 'ندارد' },
    { label: 'کد پستی شرکت', value: (item) => item.companyPostalCode || 'ندارد' },
    { label: 'وب‌سایت شرکت', value: (item) => item.companyWebSite || 'ندارد' },
    { label: 'تاریخ استخدام', value: (item) => item.employmentDate || 'ندارد' },
    { label: 'شغل', value: (item) => item.job || 'ندارد' },
    { label: 'توضیحات شغل', value: (item) => item.jobDescription || 'ندارد' },
    { label: 'سمت', value: (item) => item.position || 'ندارد' },
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
      {data?.job_info?.map((item, index) => (
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

export default JobInfo;
