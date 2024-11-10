import { Box } from '@mui/material';
import EndOffUndraisingFeature from '../feature/endoffundraisingFeature';

const EndOffUndraisingPage = () => (
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
        maxWidth: '1400px',
        padding: 3,
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <div className="bg-gray-200 w-full text-white rounded-t-3xl p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-700">پایان جمع آوری وجه </h1>
      </div>
      <EndOffUndraisingFeature />
    </Box>
  </div>
);

export default EndOffUndraisingPage;
