import React, { useEffect, useState } from 'react';
import { Box, Button, Input, TextField, Typography, FormControlLabel, Switch } from '@mui/material';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchValidation, sendValidation } from 'src/hook/Validation';
import { OnRun } from 'src/api/OnRun';
import { toast } from 'react-toastify';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';

const Validation = ({ cardSelected, handleNext }) => {
  const { data, status } = useQuery({
    queryKey: ['shareholder', cardSelected],
    queryFn: () => fetchValidation(cardSelected),
  });

  const [formData, setFormData] = useState([]);

  useEffect(() => {
    if (status === 'success' && data && data.manager) {
      setFormData(data.manager.map((item) => ({ ...item })));
    } else if (status === 'error') {
      console.error('Failed to fetch validation data');
    }
  }, [data, status]);

  const mutation = useMutation({
    mutationKey: ['set management'],
    mutationFn: () => sendValidation(cardSelected, formData),
    onSuccess: () => {
      toast.success('فایل‌ها با موفقیت ارسال شدند');
    },
  });

  const handleFileChange = (file, index) => {
    const newFormData = [...formData];
    newFormData[index].file = file;
    setFormData(newFormData);
  };

  const handleRemoveFile = (index) => () => {
    const newFormData = [...formData];
    newFormData[index].file_manager = null;
    setFormData(newFormData);
  };

  const handleSwitchChange = (index) => (event) => {
    setFormData((prevFormData) => {
      const newFormData = [...prevFormData];
      newFormData[index].lock = event.target.checked;
      return newFormData;
    });
  };

  const handleTextFieldChange = (index, field) => (event) => {
    const newFormData = [...formData];
    newFormData[index][field] = event.target.value;
    setFormData(newFormData);
  };

  const handleSubmit = () => {
    mutation.mutate();
    handleNext();
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        padding: '0 16px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '900px',
          padding: 3,
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Box
          sx={{
            backgroundColor: '#f5f5f5',
            borderRadius: '16px 16px 0 0',
            padding: 4,
            textAlign: 'center',
            marginBottom: 4,
          }}
        >
          <Typography variant="h4" color="textPrimary" fontWeight="bold">
            اعتبار سنجی
          </Typography>
        </Box>

        {status === 'loading' ? (
          <Typography>در حال بارگزاری...</Typography>
        ) : (
          formData.map((item, index) => (
            <Box key={index} sx={{ marginBottom: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={item.lock}
                    onChange={handleSwitchChange(index)}
                    name="lockSwitch"
                    color="primary"
                  />
                }
              />
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 2,
                  marginBottom: 2,
                }}
              >
                <TextField
                  value={item.name || ''}
                  label="نام"
                  variant="outlined"
                  fullWidth
                  onChange={handleTextFieldChange(index, 'name')}
                />
                <TextField
                  value={item.national_code || ''}
                  label="کد ملی"
                  variant="outlined"
                  fullWidth
                  onChange={handleTextFieldChange(index, 'national_code')}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                {typeof item.file_manager === 'string' ? (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <a
                      href={`${OnRun}/${item.file_manager}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#ef5350',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      مشاهده فایل بارگذاری شده
                      <FileCopyOutlinedIcon style={{ fontSize: '16px' }} />
                    </a>
                    <Button variant="outlined" size="small" onClick={handleRemoveFile(index)}>
                      حذف
                    </Button>
                  </Box>
                ) : (
                  <Input
                    type="file"
                    sx={{ mt: 1 }}
                    onChange={(e) => handleFileChange(e.target.files[0], index)}
                  />
                )}
              </Box>
            </Box>
          ))
        )}

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          تایید
        </Button>
      </Box>
    </div>
  );
};

Validation.propTypes = {
  handleNext: PropTypes.func.isRequired,
  cardSelected: PropTypes.string.isRequired,
};

export default Validation;
