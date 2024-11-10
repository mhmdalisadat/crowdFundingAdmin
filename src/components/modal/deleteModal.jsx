import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const DeleteModal = ({ open, onClose, onConfirm }) => (
  <Dialog
    open={open}
    onClose={onClose}
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
      <Button onClick={onClose} color="primary">
        انصراف
      </Button>
      <Button onClick={onConfirm} color="error" autoFocus>
        حذف
      </Button>
    </DialogActions>
  </Dialog>
);

DeleteModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default DeleteModal;
