import { Box, Typography, Grid, Switch } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetContract from 'src/module/Create_receiveRrequests/contract/services/useGetContract';

const Contract = () => {
  const [contractData, setContractData] = useState({});
  const { cartId } = useParams();
  const { data: dataContract, isError } = useGetContract(cartId);

  useEffect(() => {
    if (dataContract && !isError) {
      const contractInfo = Array.isArray(dataContract) ? dataContract[0] : dataContract;
      setContractData(contractInfo);
    }
  }, [dataContract, isError]);

  const formatNumber = (num) => {
    if (num === undefined || num === null) return '-';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const fielsLabels = [
    { label: 'کارمزد فرابورس', key: 'otc_fee' },
    { label: 'کارمزد انتشار', key: 'publication_fee' },
    { label: 'کارمزد ارائه خدمات', key: 'dervice_fee' },
    { label: 'کارمزد طراحی', key: 'design_cost' },
    { label: 'دوره بازپرداخت', key: 'payback_period', lockKey: 'lock_payback_period' },
    { label: 'دوره تامین مالی', key: 'swimming_percentage', lockKey: 'lock_swimming_percentage' },
    { label: 'سود مشارکت اسمی', key: 'partnership_interest', lockKey: 'lock_partnership_interest' },
    { label: 'ضمانت نامه', key: 'guarantee', lockKey: 'lock_guarantee' },
  ];

  const switchLabels = [
    { label: 'تطابق با ماده ۱۴۱ قانون تجارت', key: 'role_141' },
    { label: 'وضعیت چک‌های برگشتی', key: 'bounced_check' },
    { label: 'وضعیت بدهی‌های جاری غیرمجاز', key: 'non_current_debt' },
    { label: 'سابقه جرائم کیفری', key: 'criminal_record' },
    { label: 'وضعیت ممنوع‌المعامله بودن', key: 'Prohibited' },
    { label: 'واریز ۱۰ درصد سرمایه', key: 'minimum_deposit_10' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 16px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          padding: 3,
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Box display="flex" justifyContent="center" width="100%" mt={4}>
          <Box
            sx={{
              backgroundColor: 'white',
              boxShadow: 3,
              borderRadius: '16px',
              padding: '24px',
              width: '100%',
              maxWidth: '1200px',
            }}
          >
            <Box className="bg-gray-200 text-white rounded-t-3xl p-6 text-center mb-8">
              <Typography variant="h4" sx={{ color: 'black' }}>
                قرارداد عاملیت
              </Typography>
            </Box>

            <Box mt={4}>
              <Grid container spacing={2}>
                {fielsLabels.map(({ label, key }) => (
                  <Grid item xs={12} sm={6} md={3} key={key}>
                    <Box
                      sx={{
                        padding: 2,
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        backgroundColor: '#f9f9f9',
                        marginBottom: 2,
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {label}:
                      </Typography>
                      <Typography variant="body2" sx={{ marginTop: 1 }}>
                        {formatNumber(contractData[key])}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box mt={4}>
              <Grid container spacing={2}>
                {switchLabels.map(({ label, key }) => (
                  <Grid item xs={12} sm={6} md={3} key={key}>
                    <Box
                      sx={{
                        padding: 2,
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        backgroundColor: '#f9f9f9',
                        marginBottom: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {label}:
                      </Typography>
                      <Switch checked={contractData[key] || false} disabled />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Contract;
