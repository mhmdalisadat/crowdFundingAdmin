/* eslint-disable consistent-return */
import { Box, Button, Modal, Typography, Switch, FormControlLabel } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { sendCommit } from '../service/commentService';

const PlanCommentsModal = ({ openModal, handleCloseModal, selectedComment, refetch }) => {
  const [status, setStatus] = useState(false);
  const [known, setKnown] = useState(false);

  useEffect(() => {
    if (selectedComment) {
      setStatus(selectedComment.status);
      setKnown(selectedComment.known);
    }
  }, [selectedComment]);

  const mutation = useMutation({
    mutationKey: ['sendCommits', selectedComment?.id],
    mutationFn: () => {
      if (!selectedComment) return;
      return sendCommit(selectedComment.id, { ...selectedComment, status, known });
    },
    onSuccess: () => {
      refetch();
    },
  });

  const handleCellEdited = () => {
    mutation.mutate();
    handleCloseModal();
  };

  return (
    <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-title">
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Box
          sx={{
            padding: 2,
            backgroundColor: 'white',
            borderRadius: 2,
            maxWidth: '700px',
            width: '100%',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#e0e0e0',
              borderRadius: '16px 16px 0 0',
              padding: '16px',
              textAlign: 'center',
              marginBottom: '10px',
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              جزئیات نظر
            </Typography>
          </Box>
          {selectedComment && (
            <div>
              <Typography variant="body1" mb={2}>
                <strong>نام:</strong> {selectedComment.firstName} {selectedComment.lastName}
              </Typography>
              <Typography variant="body1">
                <strong>متن نظر:</strong> {selectedComment.comment}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={status}
                      onChange={(e) => setStatus(e.target.checked)}
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body1">
                      <strong>وضعیت:</strong> {status ? 'انتشار' : 'عدم انتشار'}
                    </Typography>
                  }
                />
              </Box>
            </div>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
            <Button onClick={handleCloseModal} color="primary" sx={{ marginRight: 1 }}>
              انصراف
            </Button>
            <Button
              onClick={handleCellEdited}
              variant="contained"
              color="primary"
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
  openModal: PropTypes.bool.isRequired,
  selectedComment: PropTypes.object,
  handleCloseModal: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default PlanCommentsModal;
