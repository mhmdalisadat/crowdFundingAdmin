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

const PaymentModal = ({ selectedRow, handleClose, open }) => (
  <Dialog
    open={open}
    onClose={handleClose}
    fullWidth
    maxWidth="sm"
    PaperProps={{ sx: { borderRadius: '12px', padding: 2 } }}
  >
    <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem' }}>
      <div className="bg-gray-200 w-full text-white rounded-t-3xl p-6 text-center mb-2">
        <h1 className="text-2xl font-bold text-gray-700">جزئیات پرداخت</h1>
      </div>
    </DialogTitle>

    <DialogContent>
      {selectedRow && (
        <Box sx={{ marginTop: 2, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
            {`تاریخ تراکنش: ${new Date(selectedRow.transaction_date).toLocaleString('fa-IR')}`}
          </Typography>
          <Box sx={{ marginTop: 2, fontSize: '1.1rem' }}>
            <Typography sx={{ marginBottom: 1 }}>
              <strong>مقدار اعتبار:</strong> {selectedRow.credit_amount.toLocaleString()} تومان
            </Typography>
            <Typography sx={{ marginBottom: 1 }}>
              <strong>مقدار بدهی:</strong> {selectedRow.debt_amount.toLocaleString()} تومان
            </Typography>
            <Typography sx={{ marginBottom: 1 }}>
              <strong>وضعیت پرداخت:</strong> {selectedRow.status ? 'موفق' : 'ناموفق'}
            </Typography>
            <Typography sx={{ marginBottom: 1 }}>
              <strong>کیف پول:</strong> {selectedRow.wallet}
            </Typography>
          </Box>
        </Box>
      )}
    </DialogContent>
    <DialogActions sx={{ justifyContent: 'center' }}>
      <Button onClick={handleClose} variant="contained" color="primary">
        بستن
      </Button>
    </DialogActions>
  </Dialog>
);

PaymentModal.propTypes = {
  selectedRow: PropTypes.shape({
    transaction_date: PropTypes.string.isRequired,
    credit_amount: PropTypes.number.isRequired,
    debt_amount: PropTypes.number.isRequired,
    status: PropTypes.bool.isRequired,
    wallet: PropTypes.number.isRequired,
  }),
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default PaymentModal;
