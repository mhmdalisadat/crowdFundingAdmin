/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';
import { IoKey } from 'react-icons/io5';
import { TextField, Modal, Box, Typography, Button, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SubmitButton } from 'src/components/button';
import { useParams } from 'react-router-dom';
import useUpdateUser from '../service/useUpdateUser';
import useGetUserDetail from '../service/useGetUserDetail';
import usePostOtpUser from '../service/usePostOtpUser';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '12px',
  p: 4,
};

const Refresh = ({ setShowRefresh }) => {
  const { userId } = useParams();
  const [value, setValue] = useState('');
  const { mutate } = useUpdateUser();
  const { data, isLoading, error } = useGetUserDetail(userId);
  const { mutate: mutateOtp } = usePostOtpUser();
  const nationalCode = data?.private_person?.[0]?.uniqueIdentifier ?? '';

  const handleClose = () => {
    if (typeof setShowRefresh === 'function') {
      setShowRefresh(false);
    } else {
      console.error('setShowRefresh یک تابع معتبر نیست.');
    }
  };

  const handleInputChange = (e) => setValue(e.target.value);

  const handleUpdate = () => {
    if (value && nationalCode) {
      mutate(
        { otp: value, uniqueIdentifier: nationalCode },
        {
          onSuccess: () => toast.success('اطلاعات با موفقیت به‌روز شد'),
          onError: () => toast.error('خطایی رخ داد. لطفا دوباره تلاش کنید.'),
        }
      );
      setShowRefresh(false);
    } else {
      toast.warn('کد تایید یا کد ملی موجود نیست');
    }
  };
  const handelPostOtp = () => {
    mutateOtp(nationalCode);
    toast.success('ارسال مجدد کد با موفقیت انجام شد');
  };

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا در دریافت اطلاعات کاربر.</p>;

  return (
    <Modal open onClose={handleClose}>
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" component="h2" fontWeight="bold">
            کد تایید
          </Typography>
          <IconButton onClick={handleClose}>
            <AiOutlineClose size={24} />
          </IconButton>
        </Box>

        <Box mt={2}>
          <label htmlFor="otp" className="flex items-center gap-2 mb-4">
            <IoKey className="text-2xl text-gray-600" />
            <TextField
              fullWidth
              value={value}
              onChange={handleInputChange}
              placeholder="کد تایید را وارد کنید"
            />
          </label>

          <SubmitButton onClick={handleUpdate}>تایید</SubmitButton>

          <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={handelPostOtp}>
            ارسال مجدد
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

Refresh.propTypes = {
  setShowRefresh: PropTypes.func.isRequired,
};

export default Refresh;
