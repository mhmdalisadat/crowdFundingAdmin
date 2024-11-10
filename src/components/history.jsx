import React, { useEffect, useState } from 'react';
import { Box, Input, Button, TextField, FormControlLabel, Switch } from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

const History = ({ cardSelected }) => {
  const [historyData, setHistoryData] = useState(null);
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [nationalCode, setNationalCode] = useState('');
  const [lock, setLock] = useState(false);
  const access = getCookie('access');

  useEffect(() => {
    const fetchData = async () => {
      if (cardSelected) {
        try {
          const response = await axios.get(`${OnRun}/api/history/admin/${cardSelected}/`, {
            headers: {
              Authorization: `Bearer ${access}`,
              'Content-Type': 'application/json',
            },
          });
          setHistoryData(response.data);
          if (response.data.manager && response.data.manager.length > 0) {
            const manager = response.data.manager[0];
            setName(manager.name);
            setNationalCode(manager.national_code);
            setLock(manager.lock);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [cardSelected, access]);
  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(nationalCode, file);

    try {
      const response = await axios.post(`${OnRun}/api/history/admin/${cardSelected}/`, formData, {
        headers: {
          Authorization: `Bearer ${access}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setHistoryData(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
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
          alignItems: 'center',
          gap: 2,
          marginTop: 3,
        }}
      >
        <div className="bg-gray-200 w-full text-white rounded-t-3xl p-6 text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-700">سوپیشینه</h1>
        </div>

        <Box
          sx={{
            width: '100%',
            padding: '16px',
            border: '1px solid #ccc',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          <FormControlLabel
            control={
              <Switch color="primary" checked={lock} onChange={(e) => setLock(e.target.checked)} />
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="نام"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="کد ملی"
            variant="outlined"
            fullWidth
            value={nationalCode}
            onChange={(e) => setNationalCode(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          {historyData && historyData.file && typeof historyData.file === 'string' ? (
            <Box sx={{ marginTop: '16px' }}>
              <a
                href={historyData.file}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#3f51b5',
                  textDecoration: 'underline',
                }}
              >
                مشاهده فایل سابقه
              </a>
            </Box>
          ) : (
            <Box sx={{ marginTop: '16px' }}>
              <form className="w-full" onSubmit={handleFileUpload}>
                <Box
                  sx={{
                    padding: '20px',
                    border: '1px solid #ccc',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    marginBottom: '16px',
                  }}
                >
                  <Box sx={{ marginBottom: '16px' }}>
                    <Input
                      type="file"
                      onChange={handleFileChange}
                      sx={{
                        borderRadius: '8px',
                        width: '100%',
                        color: '#424242',
                        '&:focus': {
                          outline: 'none',
                          borderColor: '#3f51b5',
                          boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
                        },
                      }}
                    />
                  </Box>
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                >
                  ارسال
                </Button>
              </form>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

History.propTypes = {
  cardSelected: PropTypes.string.isRequired,
};

export default History;
