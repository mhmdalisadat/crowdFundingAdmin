import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchManager } from 'src/module/Create_receiveRrequests/managers/service/managerService';

const Managers = () => {
  const { cartId } = useParams();

  const [formSections, setFormSections] = useState([]);

  const { data, status } = useQuery({
    queryKey: ['userMessage', cartId],
    queryFn: () => fetchManager(cartId),
  });

  useEffect(() => {
    if (status === 'success' && data) {
      setFormSections(data);
    }
  }, [data, status]);

  const positions = [
    { value: 1, label: 'رئیس هیئت مدیره' },
    { value: 2, label: 'نایب رئیس' },
    { value: 3, label: 'عضو هیئت مدیره' },
    { value: 4, label: 'مدیرعامل' },
  ];

  const getPositionLabel = (positionValue) => {
    const position = positions.find((p) => p.value === Number(positionValue)); // تبدیل به عدد برای سازگاری
    return position ? position.label : 'نامشخص';
  };

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
                اطلاعات مدیران
              </Typography>
            </Box>
            {formSections.map((manager) => (
              <Box
                key={manager.id}
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
                  <Typography variant="body2">نام: {manager.name}</Typography>
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
                  <Typography>کد ملی: {manager.national_code || 'نامشخص'}</Typography>
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
                  <Typography>سمت: {getPositionLabel(manager.position)}</Typography>
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
                  <Typography>تلفن: {manager.phone || 'نامشخص'}</Typography>
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
                  <Typography>نوع: {manager.is_legal ? 'بله' : 'خیر'}</Typography>
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
                  <Typography>موظف: {manager.signature ? 'بله' : 'خیر'}</Typography>
                </Box>

                {manager.is_legal && (
                  <>
                    <Box
                      sx={{
                        flex: '1 1 23%',
                        padding: 2,
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                      }}
                    >
                      <Typography>شناسه ملی شرکت: {manager.national_id || 'نامشخص'}</Typography>
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
                      <Typography>نماینده: {manager.representative || 'نامشخص'}</Typography>
                    </Box>
                  </>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Managers;
