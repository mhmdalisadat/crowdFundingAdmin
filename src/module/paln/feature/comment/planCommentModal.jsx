import {
  Box,
  Button,
  Modal,
  Typography,
  Switch,
  FormControlLabel,
  TextField,
  CircularProgress,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import usePostcomment from '../../service/comment/usePostComment';

const PlanCommentsModal = ({ openModal, handleCloseModal, selectedComment }) => {
  const { trace_code } = useParams();
  const id = selectedComment ? selectedComment.id : null;
  const [formData, setFormData] = useState({ status: false, answer: '' });

  useEffect(() => {
    if (selectedComment) {
      setFormData((prev) => ({
        ...prev,
        status: selectedComment.status,
        answer: selectedComment.answer,
      }));
    }
  }, [selectedComment]);

  const { mutate, isPending } = usePostcomment(id, formData, trace_code);

  const handleCellEdited = () => {
    if (id) {
      mutate(formData);
      handleCloseModal();
    }
  };

  if (isPending) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-title">
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Box
          sx={{
            padding: 3,
            backgroundColor: '#f9f9f9',
            borderRadius: 3,
            maxWidth: '700px',
            width: '90%',
            boxShadow: 3,
          }}
        >
          <Box
            style={{
              backgroundColor: '#e0e0e0',
              color: '#333',
              borderRadius: '16px 16px 0 0',
              padding: '16px',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              جزئیات نظر
            </Typography>
          </Box>
          {selectedComment && (
            <div>
              <TextField
                fullWidth
                label={`${selectedComment.firstName} ${selectedComment.lastName}`}
                variant="outlined"
                value={selectedComment.comment ?? 'اطلاعات موجود نیست.'}
                multiline
                disabled
                sx={{
                  marginTop: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#b0bec5',
                    },
                    '&:hover fieldset': {
                      borderColor: '#90a4ae',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="پاسخ"
                variant="outlined"
                multiline
                value={formData.answer} // تغییر این خط
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                sx={{
                  marginTop: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#b0bec5',
                    },
                    '&:hover fieldset': {
                      borderColor: '#90a4ae',
                    },
                  },
                }}
              />

              <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body1">
                      <strong>وضعیت:</strong> {formData.status ? 'انتشار' : 'عدم انتشار'}
                    </Typography>
                  }
                />
              </Box>
            </div>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
            <Button
              onClick={handleCloseModal}
              color="primary"
              sx={{ marginRight: 1, '&:hover': { backgroundColor: '#e0e0e0' } }}
            >
              انصراف
            </Button>
            <Button
              onClick={handleCellEdited}
              variant="contained"
              color="primary"
              sx={{ '&:hover': { backgroundColor: '#1976d2' } }}
              disabled={!selectedComment}
            >
              اعمال تغییرات
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

PlanCommentsModal.propTypes = {
  openModal: PropTypes.bool,
  selectedComment: PropTypes.object,
  handleCloseModal: PropTypes.func,
};

export default PlanCommentsModal;
