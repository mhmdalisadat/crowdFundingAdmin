import React from 'react';
import { Dialog, DialogActions, DialogContent, Button, DialogTitle, DialogContentText } from '@mui/material';
import PropTypes from 'prop-types';

const PlanDeleteModal = ({ showConfirm, handleConfirmClose, handleDeleteConfirm }) => (
    <Dialog
      open={showConfirm}
      onClose={handleConfirmClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
        تایید حذف
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          آیا مطمئن هستید که می‌خواهید این بخش را حذف کنید؟
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirmClose} color="primary">
          انصراف
        </Button>
        <Button onClick={handleDeleteConfirm} color="error" autoFocus>
          حذف
        </Button>
      </DialogActions>
    </Dialog>
  );

PlanDeleteModal.propTypes = {
  showConfirm: PropTypes.bool.isRequired,
  handleConfirmClose: PropTypes.func.isRequired,
  handleDeleteConfirm: PropTypes.func.isRequired,
};

export default PlanDeleteModal;
