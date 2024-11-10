import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, TextField, Link, Button, CircularProgress } from '@mui/material';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { OnRun } from 'src/api/OnRun';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { DeleteModal } from 'src/components/modal';
import usePostProgress from '../services/usePostPlanProgress';
import useGetProgress from '../services/useGetPlanProgress';
import useDeleteProgress from '../services/useDelProgress';

const PlanProgress = () => {
  const { trace_code } = useParams();
  const { data, isLoading } = useGetProgress(trace_code);
  const [files, setFiles] = useState([]);
  const [postData, setPostData] = useState({});
  const [error, setError] = useState('');

  const { mutate } = usePostProgress(trace_code);
  const { mutate: mutateDelete } = useDeleteProgress(trace_code);
  const fileInputRef = useRef(null);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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
    mutate(postData);
    setPostData({ title: '', file: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('پیشرفت طرح با موفقیت ارسال شد');
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      mutateDelete(deleteId, {
        onSuccess: () => {
          setFiles((prevFiles) => prevFiles.filter((file) => file.id !== deleteId));
          toast.success('پیشرفت طرح مورد نظر با موفقیت حذف شد');
        },
      });
      setOpenDeleteModal(false);
      setDeleteId(null);
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
          پیشرفت طرح
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
            value={postData.title || ''}
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
            variant="contained"
            size="small"
            onClick={handleButtonClick}
            disabled={!postData.title || !postData.file}
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

      {files.map((doc) => (
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
            onClick={() => {
              setDeleteId(doc.id);
              setOpenDeleteModal(true);
            }}
            sx={{
              marginLeft: '10px',
              borderRadius: '8px',
            }}
          >
            حذف
          </Button>
        </Box>
      ))}

      <DeleteModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
};

export default PlanProgress;
