import React, { useState } from 'react';
import { Box, Typography, Input, Button, Link } from '@mui/material';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { SubmitButton } from 'src/components/button';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { OnRun } from 'src/api/OnRun';
import { useGetPic } from '../../service/planPicture/useGetPic';
import { usePostPic } from '../../service/planPicture/usePostPic';

const PlanAddPic = () => {
  const [file, setFile] = useState(null);
  const { trace_code } = useParams();

  const { data } = useGetPic(trace_code);
  const { mutate, isPending } = usePostPic(trace_code);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleButtonClick = () => {
    if (file) {
      const formData = new FormData();
      formData.append('picture', file);

      mutate(formData, {
        onSuccess: () => {
          toast.success('Picture uploaded successfully!');
        },
        onError: (error) => {
          toast.error(`Failed to upload picture: ${error.message}`);
        },
      });
    } else {
      toast.error('Please select a file before submitting.');
    }
  };

  const handleFileRemove = () => {
    setFile(null);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <ToastContainer />

      <Box
        sx={{
          backgroundColor: '#e0e0e0',
          color: '#333',
          borderRadius: '16px 16px 0 0',
          padding: '16px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          افزودن اطلاعات تکمیلی
        </Typography>
      </Box>

      {data && data.picture && (
        <Box
          sx={{
            marginTop: '20px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src={`${OnRun}${data.picture}`}
            alt="Uploaded plan"
            style={{ maxWidth: '50%', borderRadius: '8px' }}
          />
        </Box>
      )}

      {file ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
            marginTop: '20px',
            marginBottom: '20px',
          }}
        >
          <Link
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              fontSize: '14px',
              fontWeight: 'medium',
              color: '#ef5350',
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                color: '#d32f2f',
              },
            }}
          >
            مشاهده فایل بارگذاری شده
            <FileCopyOutlinedIcon sx={{ fontSize: '16px', marginLeft: '4px' }} />
          </Link>
          <Button onClick={handleFileRemove} variant="outlined">
            حذف فایل
          </Button>
        </Box>
      ) : (
        <Input
          type="file"
          onChange={handleFileChange}
          sx={{
            marginTop: '20px',
            marginBottom: '20px',
            borderRadius: '8px',
            width: '100%',
            color: '#424242',
            '& input': {
              padding: '15px',
              borderRadius: '8px',
              border: '1px solid #ddd',
            },
            '&:focus-within': {
              outline: 'none',
              borderColor: '#3f51b5',
              boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
            },
          }}
        />
      )}

      <Box mt={2}>
        <SubmitButton mt={2} onClick={handleButtonClick} disabled={isPending} />{' '}
      </Box>
    </Box>
  );
};

export default PlanAddPic;
