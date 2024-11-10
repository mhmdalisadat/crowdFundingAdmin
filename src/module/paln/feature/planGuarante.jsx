import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Link, IconButton, Button } from '@mui/material';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { AddFormButton } from 'src/components/button';
import { useMutation, useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { OnRun } from 'src/api/OnRun';
import { toast, ToastContainer } from 'react-toastify';
import { fetchGuarante, sendGuarante } from '../service/guaranteService';

const PlanGuarante = ({ idRow }) => {
  const [files, setFiles] = useState([]);

  const { data } = useQuery({
    queryKey: ['useguarante', idRow],
    queryFn: () => fetchGuarante(idRow),
  });

  useEffect(() => {
    if (data) {
      setFiles([{ title: data.data.title, file: data.data.file }]);
    } else {
      setFiles([{ title: '', file: null }]);
    }
  }, [data]);

  const mutation = useMutation({
    mutationKey: ['guarante', idRow],
    mutationFn: () => sendGuarante(idRow, files),
    onSuccess: () => {
      toast.success('تغییرات شما با موفقیت اعمال شد');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleButtonClick = (index) => {
    const fileToSend = files[index];
    mutation.mutate([fileToSend]);
  };

  const handleFileChange = (index, event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const newFiles = [...files];
      newFiles[index].file = selectedFile;
      setFiles(newFiles);
    }
  };

  const handleTitleChange = (index, event) => {
    const newFiles = [...files];
    newFiles[index].title = event.target.value;
    setFiles(newFiles);
  };

  const handleFileRemove = (index) => {
    const newFiles = [...files];
    newFiles[index].file = null;
    setFiles(newFiles);
  };

  const handleRemoveSection = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleAddFileInput = () => {
    setFiles([...files, { title: '', file: null }]);
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
          افزودن تضامین
        </Typography>
      </Box>

      {files.map((file, index) => (
        <Box
          key={index}
          sx={{
            marginTop: '20px',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            {files.length > 1 && (
              <IconButton
                color="error"
                onClick={() => handleRemoveSection(index)}
                sx={{ marginLeft: '10px' }}
                disabled={files.length === 1}
              >
                <HighlightOffIcon />
              </IconButton>
            )}
          </Box>

          <TextField
            placeholder="عنوان"
            value={file.title}
            onChange={(event) => handleTitleChange(index, event)}
            fullWidth
            sx={{ marginBottom: '10px' }}
          />

          {typeof file.file === 'string' ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                borderRadius: '8px',
                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#f9f9f9',
                width: '100%',
                marginTop: '10px',
              }}
            >
              <Link
                href={`${OnRun}/${file.file}`}
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
              <IconButton
                color="error"
                sx={{ marginLeft: '10px' }}
                onClick={() => handleFileRemove(index)}
              >
                <HighlightOffIcon />
              </IconButton>
            </Box>
          ) : (
            <TextField
              type="file"
              onChange={(event) => handleFileChange(index, event)}
              fullWidth
              inputProps={{ accept: 'application/pdf,image/*' }}
              sx={{ marginBottom: '10px' }}
            />
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <Button
              variant="contained"
              size="small"
              onClick={() => handleButtonClick(index)}
              sx={{
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#303f9f',
                },
                padding: '6px 12px',
                borderRadius: '8px',
              }}
            >
              ارسال
            </Button>
          </Box>
        </Box>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <AddFormButton onClick={handleAddFileInput} />
      </Box>
    </Box>
  );
};

PlanGuarante.propTypes = {
  idRow: PropTypes.number.isRequired,
};

export default PlanGuarante;
