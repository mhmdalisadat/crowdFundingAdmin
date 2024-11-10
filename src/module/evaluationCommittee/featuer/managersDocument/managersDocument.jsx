import { Box, Typography } from '@mui/material';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetResume from 'src/module/Create_receiveRrequests/Managerdocuments/service/useGetResume';
import { OnRun } from 'src/api/OnRun';

const ManagersDocument = () => {
  const { cartId } = useParams();

  const { data, isPending, isError } = useGetResume(cartId);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    if (!isError && data && !isPending) {
      setFormData(data.manager.map((item) => ({ ...item, lock: item.lock || false })));
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
                اطلاعات مستندات مدیران
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
                <Typography variant="body1" sx={{ flex: '1' }}>
                  نام: {manager.name}
                </Typography>
                <Typography variant="body2" sx={{ flex: '1' }}>
                  کد ملی: {manager.national_code}
                </Typography>

                {manager.file ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <a
                      href={`${OnRun}/${manager.file}`}
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
                      }}
                    >
                      مشاهده فایل
                      <FileCopyOutlinedIcon sx={{ marginLeft: '4px' }} />
                    </a>
                  </Box>
                ) : (
                  <Typography variant="body2" sx={{ marginLeft: 'auto' }}>
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

export default ManagersDocument;
