import { Box, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import moment from 'moment-jalaali';
import useGetPlanDetail from '../../service/plandetail/useGetPlandetail';

const Company = () => {
  const { trace_code } = useParams();
  const { data } = useGetPlanDetail(trace_code);

  const fields = [
    { label: 'نام شرکت', value: (item) => item.name },
    { label: 'شماره ثبت', value: (item) => item.registration_number },
    { label: 'کد اقتصادی', value: (item) => item.economic_id },
    {
      label: 'تاریخ ثبت',
      value: (item) =>
        item.registration_date
          ? moment(item.registration_date).format('jYYYY/jMM/jDD')
          : 'ناموجود',
    },
    { label: 'نوع شرکت', value: (item) => item.company_type_description },
    { label: 'آدرس', value: (item) => item.address },
    { label: 'کد پستی', value: (item) => item.postal_code },
    { label: 'شماره تلفن', value: (item) => item.phone_number },
    { label: 'شماره فکس', value: (item) => item.fax_number },
    { label: 'ایمیل', value: (item) => item.email_address },
  ];

  const renderBoxField = (label, value) => (
    <Box
      sx={{
        mb: 2,
        p: 2,
        backgroundColor: '#f5f5f5',
        borderRadius: 1,
        border: '1px solid #e0e0e0',
      }}
    >
      <Typography variant="subtitle2" sx={{ color: '#888', mb: 0.5 }}>
        {label}
      </Typography>
      <Typography variant="body1">
        {value || 'اطلاعات موجود نیست'}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      {data.company.length > 0 ? (
        data.company.map((company, index) => (
          <Box
            key={index}
            mb={3}
            sx={{
              p: 2,
              border: '1px solid #e0e0e0',
              borderRadius: 1,
              backgroundColor: '#fafafa',
            }}
          >
            <Grid container spacing={2}>
              {fields.map(({ label, value }, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  {renderBoxField(label, value(company))}
                </Grid>
              ))}
            </Grid>
          </Box>
        ))
      ) : (
        <Typography>شرکتی یافت نشد!</Typography>
      )}
    </Box>
  );
};

export default Company;
