import React, { useState } from 'react';
import { Box, Typography, Input, Button, Link } from '@mui/material';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { SubmitButton } from 'src/components/button';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { OnRun } from 'src/api/OnRun';
import { useGetPic } from '../../service/planPicture/useGetPic';
import { usePostPic } from '../../service/planPicture/usePostPic';

const PlanAddPic = () => {
  const [file, setFile] = useState(null);
  const { trace_code } = useParams();
  const { data } = useGetPic(trace_code);
  const { mutate, isPending, isError } = usePostPic(trace_code);

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
          toast.success('عکس با موفقیت آپلود شد.');
        },
        onError: (error) => {
          toast.error(`خطا در ارسال عکس: ${error.message}`);
        },
      });
    } else {
      toast.error('لطفا قبل از ارسال یک فایلی آپلود کنید.');
    }
  };

  const handleFileRemove = () => {
    setFile(null);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box className="bg-gray-100 text-center py-4 rounded-t-lg">
        <Typography variant="h5" component="h1" className="text-gray-700 font-bold">
            افزودن عکس
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
            },
          }}
        />
      )}

      <Box mt={2}>
        <SubmitButton mt={2} onClick={handleButtonClick} disabled={isPending} />{' '}
      </Box>

      {isError && (
        <Typography color="error">An error occurred while uploading the picture.</Typography>
      )}
    </Box>
  );
};

export default PlanAddPic;
