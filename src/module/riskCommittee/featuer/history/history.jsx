import { Box, Typography } from '@mui/material';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetHistory from 'src/module/Create_receiveRrequests/history/service/useGetHistory';
import { OnRun } from 'src/api/OnRun';
import moment from 'moment-jalaali';

const History = () => {
  const { cartId } = useParams();
  const { data, isPending, isError } = useGetHistory(cartId);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    if (!isError && data && data.manager && !isPending) {
      setFormData(data.manager.map((item) => ({ ...item })));
    }
  }, [data, isError, isPending]);

  const formatDate = (date) => moment(date).format('jYYYY/jMM/jDD HH:mm');
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

            {/* نمایش اطلاعات formData */}
            {formData.map((manager, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 2,
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9',
                  marginBottom: 2,
                  gap: 2,
                }}
              >
                <Typography variant="body1" sx={{ flex: '1', textAlign: 'center' }}>
                  نام: {manager.name}
                </Typography>
                <Typography variant="body2" sx={{ flex: '1', textAlign: 'center' }}>
                  کد ملی: {manager.national_code}
                </Typography>
                <Typography variant="body2" sx={{ flex: '1', textAlign: 'center' }}>
                  تاریخ: {formatDate(manager.date)}
                </Typography>

                {manager.file ? (
                  <Box
                    sx={{
                      flex: '1',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <a
                      href={`${OnRun}/${manager.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f7f7f7',
                        padding: '8px',
                        borderRadius: '8px',
                        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                        textDecoration: 'none',
                        color: 'black',
                      }}
                    >
                      مشاهده فایل
                      <FileCopyOutlinedIcon sx={{ marginLeft: '4px' }} />
                    </a>
                  </Box>
                ) : (
                  <Typography variant="body2" sx={{ flex: '1', textAlign: 'center' }}>
                    فایلی موجود نیست
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default History;
