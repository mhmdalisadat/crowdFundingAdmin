import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import PropTypes from 'prop-types';

const UserModal = ({ selectedRow, handleClose, open }) => (
  <Dialog
    open={open}
    onClose={handleClose}
    fullWidth
    maxWidth="sm"
    PaperProps={{ sx: { borderRadius: '12px', padding: 2 } }}
  >
    <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem' }}>
      <div className="bg-gray-200 w-full text-white rounded-t-3xl p-6 text-center mb-2">
        <h1 className="text-2xl font-bold text-gray-700">اطلاعات کاربر</h1>
      </div>
    </DialogTitle>

    <DialogContent>
      {selectedRow ? (
        <Box sx={{ marginTop: 2, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
            {`${selectedRow.firstName} ${selectedRow.lastName}`}
          </Typography>
          <Box sx={{ marginTop: 2, fontSize: '1.1rem' }}>
            <Typography sx={{ marginBottom: 1 }}>
              <strong>جنسیت:</strong> {selectedRow.gender === 'Female' ? 'زن' : 'مرد'}
            </Typography>

            <Typography sx={{ marginBottom: 1 }}>
              <strong>کدملی:</strong> {selectedRow.uniqueIdentifier}
            </Typography>
            <Typography sx={{ marginBottom: 1 }}>
              <strong>تاریخ تولد:</strong>{' '}
              {new Date(selectedRow.birthDate).toLocaleDateString('fa-IR')}
            </Typography>
            <Typography sx={{ marginBottom: 1 }}>
              <strong>محل تولد:</strong> {selectedRow.placeOfBirth}
            </Typography>
            <Typography sx={{ marginBottom: 1 }}>
              <strong>محل صدور:</strong> {selectedRow.placeOfIssue}
            </Typography>
            <Typography sx={{ marginBottom: 1 }}>
              <strong>نام پدر:</strong> {selectedRow.fatherName}
            </Typography>
            <Typography sx={{ marginBottom: 1 }}>
              <strong>شماره سریال:</strong> {selectedRow.serial}
            </Typography>
          </Box>
        </Box>
      ) : null}
    </DialogContent>
    <DialogActions sx={{ justifyContent: 'center' }}>
      <Button onClick={handleClose} variant="contained" color="primary">
        بستن
      </Button>
    </DialogActions>
  </Dialog>
);

UserModal.propTypes = {
  selectedRow: PropTypes.object,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default UserModal;
