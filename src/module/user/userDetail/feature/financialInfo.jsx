import { Box, TextField, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import useGetUserDetail from '../service/useGetUserDetail';

const FinancialInfo = () => {
  const { userId } = useParams();
  const { data } = useGetUserDetail(userId);

  const fields = [
    { label: 'ارزش دارایی‌ها', value: (item) => item.assetsValue || 'ندارد' },
    { label: 'هدف شرکت', value: (item) => item.companyPurpose || 'ندارد' },
    { label: 'میانگین درآمد', value: (item) => item.inComingAverage || 'ندارد' },
    { label: 'تراکنش‌های خروجی', value: (item) => item.outExchangeTransaction || 'ندارد' },
    { label: 'تراکنش‌های ورودی', value: (item) => item.cExchangeTransaction || 'ندارد' },
    { label: 'نرخ', value: (item) => item.rate || 'ندارد' },
    { label: 'تاریخ نرخ', value: (item) => item.rateDate || 'ندارد' },
    { label: 'نرخ مرجع شرکت', value: (item) => item.referenceRateCompany || 'ندارد' },
    { label: 'تراکنش‌های تجاری', value: (item) => item.sExchangeTransaction || 'ندارد' },
    { label: 'سطح دانش معاملاتی', value: (item) => item.tradingKnowledgeLevel || 'ندارد' },
    { label: 'سطح تراکنش', value: (item) => item.transactionLevel || 'ندارد' },
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
      {data?.financial_info?.map((item, index) => (
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

export default FinancialInfo;
