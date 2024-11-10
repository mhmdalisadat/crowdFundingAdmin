import { Box, Typography, Button } from '@mui/material';
import { useState } from 'react';
import RiskCompanyInput from './comapnyInfoInputs';
import Logo from './logo';
import ReportLastYear from './report_lastyear';
import ReportYaerOld from './report_yearold';
import ColumnsThisyear from './alignment_6columns_thisyear';

const CompanyFeatuet = () => {
  const [status, setStatus] = useState('pending');
  const handleApprove = () => {
    setStatus('approved');
  };

  const handleReview = () => {
    setStatus('review');
  };

  return (
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
            اطلاعات درخواست
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: 'center',
              maxWidth: '1800px',
              width: '100%',
            }}
          >
            <RiskCompanyInput />
            <ReportLastYear />
            <ReportYaerOld />
            <ColumnsThisyear />
            <Logo />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            mt: 4,
            padding: 2,
            borderRadius: 1,
            width: 'fit-content',
          }}
        >
          <Typography sx={{ textAlign: 'center', p: 2 }}>انتخاب وضعیت</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              onClick={handleApprove}
              disabled={status === 'approved'}
              sx={{ width: '100px' }}
            >
              تایید
            </Button>
            <Button
              variant="contained"
              onClick={handleReview}
              disabled={status === 'review'}
              sx={{ width: '100px' }}
            >
              بررسی
            </Button>
          </Box>
          <Box sx={{ mt: 2, textAlign: 'left' }}>
            {status === 'approved' && (
              <Typography variant="body2" color="success">
                تایید شده
              </Typography>
            )}
            {status === 'review' && (
              <Typography variant="body2" color="warning">
                در حال بررسی
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyFeatuet;
