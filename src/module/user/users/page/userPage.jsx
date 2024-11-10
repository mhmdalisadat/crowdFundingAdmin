import { Box, CircularProgress, Typography } from '@mui/material';
import UserFeature from '../feature/userfeature';
import useGetUser from '../services/useGetUser';

const UserPage = () => {
  const { data, isPending, isError } = useGetUser();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
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
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          marginTop: '40px',
        }}
      >
        <div className="bg-gray-200 w-full text-white rounded-t-3xl p-6 text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">کاربران</h1>
        </div>

        {isPending && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <CircularProgress />
          </div>
        )}

        {isError && (
          <div style={{ textAlign: 'center', color: 'red', padding: '20px' }}>
            <Typography variant="h6">خطا در بارگذاری داده‌ها. لطفاً دوباره تلاش کنید.</Typography>
          </div>
        )}

        {data && <UserFeature/>}
      </Box>
    </div>
  );
};

export default UserPage;
