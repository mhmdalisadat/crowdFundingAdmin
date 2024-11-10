import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetShereholder from 'src/module/Create_receiveRrequests/shareholder/service/useGetShareholder';

const Shereholder = () => {
  const { cartId } = useParams();
  const { data, isPending, isError } = useGetShereholder(cartId);
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    if (!isError && data && !isPending) {
      setFetchedData(data.data);
    }
  }, [data, isError, isPending]);


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
                اطلاعات سهامداران
              </Typography>
            </Box>
            {fetchedData.map((shreholder) => (
              <Box
                key={shreholder.id}
                sx={{
                  padding: 2,
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9',
                  marginBottom: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    flex: '1 1 23%',
                    padding: 2,
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                  }}
                >
                  <Typography variant="body2">نام: {shreholder.name}</Typography>
                </Box>

                <Box
                  sx={{
                    flex: '1 1 23%',
                    padding: 2,
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                  }}
                >
                  <Typography>کد ملی: {shreholder.national_code || 'نامشخص'}</Typography>
                </Box>

                <Box
                  sx={{
                    flex: '1 1 23%',
                    padding: 2,
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                  }}
                >
                  <Typography>درصد سهام: {shreholder.percent}</Typography>
                </Box>

                <Box
                  sx={{
                    flex: '1 1 23%',
                    padding: 2,
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                  }}
                >
                  <Typography>تلفن: {shreholder.phone || 'نامشخص'}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Shereholder;
