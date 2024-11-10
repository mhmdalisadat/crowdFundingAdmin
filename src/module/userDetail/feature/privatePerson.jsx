import { Box, TextField, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import jalaliday from 'jalaliday';
import useGetUserDetail from '../service/useGetUserDetail';

dayjs.extend(jalaliday);

const PrivatePerson = () => {
  const { userId } = useParams();
  const { data } = useGetUserDetail(userId);

  const toJalali = (date) => (date ? dayjs(date).calendar('jalali').format('YYYY/MM/DD') : 'ندارد');

  const fields = [
    { label: 'شناسه منحصر به فرد', value: (item) => item.uniqueIdentifier },
    { label: 'نام', value: (item) => item.firstName || 'ندارد' },
    { label: 'نام خانوادگی', value: (item) => item.lastName || 'ندارد' },
    { label: 'تاریخ تولد', value: (item) => toJalali(item.birthDate) },
    { label: 'نام پدر', value: (item) => item.fatherName || 'ندارد' },
    { label: 'جنسیت', value: (item) => item.gender || 'ندارد' },
    { label: 'محل تولد', value: (item) => item.placeOfBirth || 'ندارد' },
    { label: 'محل صدور', value: (item) => item.placeOfIssue || 'ندارد' },
    { label: 'سری شناسنامه', value: (item) => item.seriSh || 'ندارد' },
    { label: 'شماره شناسنامه', value: (item) => item.serial || 'ندارد' },
    { label: 'شماره شناسایی', value: (item) => item.shNumber || 'ندارد' },
    { label: 'امضا', value: (item) => (item.signatureFile ? 'وجود دارد' : 'ندارد') },
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
      {data?.private_person?.map((item, index) => (
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

export default PrivatePerson;
