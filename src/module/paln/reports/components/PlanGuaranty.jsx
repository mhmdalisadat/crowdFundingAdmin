import React, { useState } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';
import moment from 'moment-jalaali';
import { useParams } from 'react-router-dom';
import { DeleteModal } from 'src/components/modal';
import useGetGuaranty from '../../service/Guranty/useGetGuaranty';
import usePostGuaranty from '../../service/Guranty/usePostGuarsnty';
import useDeleteGuarante from '../../service/Guranty/useDeleteGuaranty';
import useUpdateGuaranty from '../../service/Guranty/useUpdateGuranty';

const PlanGuaranty = () => {
  const { trace_code } = useParams();
  const [formData, setFormData] = useState({
    id: null,
    kind_of_warranty: '',
    exporter: '',
    date: null,
  });
  const [error, setError] = useState('');
  const { data: guarantyData, isPending, error: queryError } = useGetGuaranty(trace_code);
  const { mutate } = usePostGuaranty(trace_code);
  const { mutate: deleteGuarante } = useDeleteGuarante(trace_code);
  const { mutate: updateMutate } = useUpdateGuaranty(trace_code);
  const [isEditing, setIsEditing] = useState(false);

  // State for managing the delete confirmation modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleUpdate = (guaranty) => {
    setFormData({
      id: guaranty.id,
      kind_of_warranty: guaranty.kind_of_warranty,
      exporter: guaranty.exporter,
      date: moment(guaranty.date).toDate(),
    });
    setIsEditing(true);
  };

  const handleSubmit = () => {
    const { id, kind_of_warranty, exporter, date } = formData;
    if (!kind_of_warranty || !exporter || !date) {
      setError('لطفاً تمامی فیلدها را پر کنید.');
      return;
    }

    const timestamp = date instanceof Date ? date.getTime() : null;
    const dataToSubmit = { kind_of_warranty, exporter, date: timestamp };
    setError('');
    setFormData({ id: null, kind_of_warranty: '', exporter: '', date: null });

    if (isEditing) {
      updateMutate({ id, ...dataToSubmit });
    } else {
      mutate(dataToSubmit);
    }
    setIsEditing(false);
  };

  // Function to open the delete confirmation modal
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteGuarante(deleteId);
      setOpenDeleteModal(false);
      setDeleteId(null);
    }
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
          ضمانت نامه ها
        </Typography>
      </Box>

      <Box
        sx={{
          marginTop: '20px',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
        }}
      >
        <TextField
          label="نوع"
          variant="outlined"
          fullWidth
          value={formData.kind_of_warranty}
          onChange={(e) => setFormData({ ...formData, kind_of_warranty: e.target.value })}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="صادر کننده"
          variant="outlined"
          fullWidth
          value={formData.exporter}
          onChange={(e) => setFormData({ ...formData, exporter: e.target.value })}
          sx={{ marginBottom: 2 }}
        />

        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
          تاریخ :
        </Typography>
        <Box sx={{ mb: 2 }}>
          <DatePicker
            format="YYYY/MM/DD"
            calendar={persian}
            locale={persian_fa}
            value={formData.date}
            onChange={(date) => setFormData({ ...formData, date: date ? date.toDate() : null })}
            style={{
              minWidth: '100%',
              height: '55px',
              padding: '15px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              backgroundColor: '#ffffff',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            }}
          />
        </Box>

        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button
            variant="contained"
            size="small"
            onClick={handleSubmit}
            disabled={!formData.kind_of_warranty || !formData.exporter || !formData.date}
            sx={{
              color: '#fff',
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '#115293' },
              padding: '6px 12px',
              borderRadius: '8px',
            }}
          >
            {isEditing ? 'بروزرسانی' : 'ارسال'}
          </Button>
        </Box>

        {isPending && <Typography>در حال بارگذاری...</Typography>}
        {queryError && <Typography color="error">خطا در بارگذاری اطلاعات</Typography>}
      </Box>

      {guarantyData &&
        guarantyData.length > 0 &&
        guarantyData.map((guaranty) => (
          <Box
            key={guaranty.id}
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
            <Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                نوع: {guaranty.kind_of_warranty}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                صادر کننده: {guaranty.exporter}
              </Typography>
              <Typography variant="body1">
                تاریخ: {moment(guaranty.date).locale('fa').format('jYYYY/jMM/jDD')}
              </Typography>
            </Box>
            <Box>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mr: 1 }}
                onClick={() => handleUpdate(guaranty)}
              >
                به روز رسانی
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDeleteClick(guaranty.id)}
              >
                حذف
              </Button>
            </Box>
          </Box>
        ))}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
};

export default PlanGuaranty;
