import { Box, FormControlLabel, Switch, TextField, Input, Button } from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchResume, sendResume } from 'src/hook/resume';
import PropTypes from 'prop-types';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { OnRun } from 'src/api/OnRun';

const Resume = ({ cardSelected, handleNext }) => {
  const { data, status } = useQuery({
    queryKey: ['shareholder', cardSelected],
    queryFn: () => fetchResume(cardSelected),
  });
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    if (status === 'success' && data && data.manager) {
      setFormData(data.manager.map((item) => ({ ...item, lock: item.lock || false })));
    } else if (status === 'error') {
      console.error('Failed to fetch resume data');
    }
  }, [data, status]);

  const mutation = useMutation({
    mutationKey: ['set management'],
    mutationFn: () => sendResume(cardSelected, formData),
  });

  const handleFileChange = (file, index) => {
    const newFormData = [...formData];
    newFormData[index].file = file;
    setFormData(newFormData);
  };

  const handleRemoveFile = (index) => () => {
    const newFormData = [...formData];
    newFormData[index].file = null;
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

  const handleButtonClick = () => {
    mutation.mutate();
    handleNext();
  };

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
        <div className="bg-gray-200 w-full text-white rounded-t-3xl p-6 text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-700">مستندات مدیران</h1>


        </div>
        {formData.length > 0 ? (
          formData.map((item, index) => (
            <form key={index} className="w-full">
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 4,
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={item.lock}
                      onChange={handleSwitchChange(index)}
                      name="customSwitch"
                      color="primary"
                    />
                  }
                />
              </Box>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                  gap: 2,
                  marginBottom: 4,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    alignItems: 'flex-start',
                  }}
                >
                  <TextField
                    value={item.name}
                    label="نام و نام خانوادگی"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={handleTextFieldChange(index, 'name')}
                  />
                </Box>
                {!item.is_legal && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      alignItems: 'flex-start',
                    }}
                  >
                    <TextField
                      type="text"
                      name="national_code"
                      inputProps={{ maxLength: 10 }}
                      required
                      label="کد ملی"
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 2 }}
                      value={item.national_code}
                      onChange={handleTextFieldChange(index, 'national_code')}
                    />
                  </Box>
                )}

                {item.is_legal && (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        alignItems: 'flex-start',
                      }}
                    >
                      <TextField
                        type="text"
                        required
                        inputProps={{ maxLength: 10 }}
                        name="national_id"
                        label="کد شناسه"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={item.national_id}
                        onChange={handleTextFieldChange(index, 'national_id')}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        alignItems: 'flex-start',
                      }}
                    >
                      <TextField
                        type="text"
                        required
                        name="representative"
                        label="نماینده"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={item.representative}
                        onChange={handleTextFieldChange(index, 'representative')}
                      />
                    </Box>
                  </>
                )}

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    alignItems: 'flex-start',
                  }}
                >
                  {typeof item.file === 'string' && item.file ? (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <a
                        href={`${OnRun}/${item.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#ef5350',
                          marginTop: '10px',
                          fontSize: '13px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        مشاهده فایل بارگذاری شده
                        <FileCopyOutlinedIcon style={{ fontSize: '16px' }} />
                      </a>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={handleRemoveFile(index)}
                        sx={{ height: 'auto', mt: '4px' }}
                      >
                        حذف
                      </Button>
                    </Box>
                  ) : (
                    <Input
                      name="file"
                      type="file"
                      id="file-upload-resume"
                      sx={{ marginTop: '8px' }}
                      onChange={(e) => handleFileChange(e.target.files[0], index)}
                    />
                  )}
                </Box>
              </Box>
            </form>
          ))
        ) : (
          <div>درحال بارگزاری</div>
        )}

        <Button variant="contained" color="primary" onClick={handleButtonClick}>
          تایید
        </Button>
      </Box>
    </div>
  );
};

Resume.propTypes = {
  handleNext: PropTypes.func.isRequired,
  cardSelected: PropTypes.string.isRequired,
};

export default Resume;
