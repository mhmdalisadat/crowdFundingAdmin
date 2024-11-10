/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, TextField, Link, Button } from '@mui/material';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { OnRun } from 'src/api/OnRun';
import { toast } from 'react-toastify';
import { DeleteModal } from 'src/components/modal';
import useGetGuarante from '../../service/gaurantee/useGetGuarante';
import usePostGuarante from '../../service/gaurantee/usePostDocumentaion';
import useDeleteGuarante from '../../service/gaurantee/useDeleteDocumentation';

const PlanGuarante = () => {
  const { data, isPending, isSuccess } = useGetGuarante();

  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [postData, setPostData] = useState({ title: '', file: null });
  const [openModal, setOpenModal] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);
  const fileInputRef = useRef(null);

  const { mutate: postGuarante } = usePostGuarante();
  const { mutate: deleteGuarante } = useDeleteGuarante();

  useEffect(() => {
    if (data) {
      setFiles(data);
    }
  }, [data]);

  const handleButtonClick = () => {
    if (!postData.title) {
      setError('لطفاً عنوان را وارد کنید.');
      return;
    }
    setError('');
    postGuarante(postData);
    setPostData({ title: '', file: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('تضامین با موفقیت ارسال شد');
  };

  const handleDelete = (id) => {
    setDocToDelete(id);
    setOpenModal(true);
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
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

      <Box
        sx={{
          marginTop: '20px',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
        }}
      >
        <Box sx={{ marginBottom: '15px' }}>
          <TextField
            value={postData.title}
            placeholder="عنوان"
            onChange={(e) => setPostData((prev) => ({ ...prev, title: e.target.value }))}
            fullWidth
            error={!!error}
            helperText={error}
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            type="file"
            inputRef={fileInputRef}
            onChange={(e) => setPostData((prev) => ({ ...prev, file: e.target.files[0] }))}
            fullWidth
            inputProps={{ accept: 'application/pdf,image/*' }}
            sx={{ marginBottom: '10px' }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <Button
            disabled={!postData.title || !postData.file}
            variant="contained"
            size="small"
            onClick={handleButtonClick}
            sx={{
              color: '#fff',
              '&:hover': { backgroundColor: '#303f9f' },
              padding: '6px 12px',
              borderRadius: '8px',
            }}
          >
            ارسال
          </Button>
        </Box>
      </Box>

      {files && !isPending && isSuccess && files.map((doc) => (
        <Box
          key={doc.id}
          sx={{
            mt: 4,
            boxShadow: 2,
            p: 3,
            borderRadius: 2,
            bgcolor: '#f9f9f9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography>عنوان: {doc.title}</Typography>
            <Link
              href={`${OnRun}/${doc.file}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontSize: '16px',
                color: '#1976d2',
                fontWeight: '500',
                transition: 'color 0.3s',
                '&:hover': { textDecoration: 'underline', color: '#115293' },
              }}
            >
              فایل بارگزاری شده
            </Link>
            <FileCopyOutlinedIcon sx={{ fontSize: '16px', marginLeft: '8px', color: '#1976d2' }} />
          </Box>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => handleDelete(doc.id)}
            sx={{ marginLeft: '10px', borderRadius: '8px' }}
          >
            حذف
          </Button>
        </Box>
      ))}

      <DeleteModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={() => {
          deleteGuarante(docToDelete);
          setFiles((prevFiles) => prevFiles.filter((doc) => doc.id !== docToDelete));
          toast.success('تضامین حذف شد');
          setOpenModal(false);
        }}
      />
    </Box>
  );
};

export default PlanGuarante;
