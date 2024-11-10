import { Box, Typography } from '@mui/material';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { useEffect, useState } from 'react';
import { OnRun } from 'src/api/OnRun';
import useGetValidation from 'src/module/Create_receiveRrequests/validation/service/useGetValidation';
import { useParams } from 'react-router-dom';
import moment from 'moment-jalaali';

const Validation = () => {
  const { cartId } = useParams();
  const { data, isPending, isError } = useGetValidation(cartId);
  
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    if (!isError && data && !isPending) {
      setFormData(data.data.managers.map((item) => ({
        national_code: item.national_code,
        name: item.name,
        file: item.file_manager,
        date: item.date,
        lock: item.lock,
      })));
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
                اعتبار سنجی
              </Typography>
            </Box>
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
                <Typography variant="body1" sx={{ flex: 1 }}>
                  نام: {manager.name}
                </Typography>
                <Typography variant="body2" sx={{ flex: 1 }}>
                  کد ملی: {manager.national_code}
                </Typography>

                <Typography variant="body2" sx={{ flex: 1 }}>
                  تاریخ: {moment(manager.date).format('jYYYY/jMM/jDD')}
                </Typography>

                {manager.file ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                    <a
                      href={`${OnRun}${manager.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#f7f7f7',
                        padding: '8px',
                        borderRadius: '8px',
                        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                        textDecoration: 'none',
                        color: 'black',
                        flex: 1,
                      }}
                    >
                      مشاهده فایل
                      <FileCopyOutlinedIcon sx={{ marginLeft: '4px' }} />
                    </a>
                  </Box>
                ) : (
                  <Typography variant="body2" sx={{ flex: 1 }}>
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

export default Validation;
