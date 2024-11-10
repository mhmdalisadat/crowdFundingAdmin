import { Box, Typography } from '@mui/material';
import RiskCompanyInput from './comapnyInfoInputs';
import Logo from './logo';
import ReportLastYear from './report_lastyear';
import ReportYaerOld from './report_yearold';
import ColumnsThisyear from './alignment_6columns_thisyear';

const CompanyFeatuet = () => (
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

      </Box>
    </Box>
  );

export default CompanyFeatuet;
