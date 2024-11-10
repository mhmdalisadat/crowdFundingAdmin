import React, { useState } from 'react';
import {
  Box,
  Grid,
  InputAdornment,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';
import SelectField from 'src/components/fild/selectedfiled';
import GlobalTextField from 'src/components/fild/textfiled';
import PropTypes from 'prop-types';
import { useMutation } from '@tanstack/react-query';
import { SubmitButton } from 'src/components/button';
import { toast, ToastContainer } from 'react-toastify';
import Label from 'src/components/label';
import { sendPlanData } from '../service/planService';

const formatNumber = (num) => {
  if (!num) return '';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const PlanCreateModal = ({ open, onClose, refetch }) => {
  const [formData, setFormData] = useState({});

  const mutation = useMutation({
    mutationKey: ['create'],
    mutationFn: sendPlanData,
    onSuccess: () => {
      toast.success('طرح شما با موفقیت ساخته شد');
      onClose();
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = () => {
    const startDate = new Date(formData.remaining_from_to).getTime();
    const endDate = new Date(formData.remaining_date_to).getTime();

    const dataToSubmit = {
      ...formData,
      remaining_from_to: startDate,
      remaining_date_to: endDate,
    };

    mutation.mutate(dataToSubmit);
  };

  const handlePercentageChange = (e, key) => {
    const value = e.target.value.replace(/,/g, '');
    if (value <= 100) {
      setFormData({ ...formData, [key]: value });
    }
  };

  const formatDate = (date) => {
    if (!date) return null;
    const jsDate = new Date(date.year, date.month - 1, date.day);
    return jsDate.toISOString();
  };

  return (
    <>
      <ToastContainer />
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
        <DialogContent>
          <Grid container spacing={2}>
            <div className="bg-gray-200 w-full text-white rounded-t-3xl p-6 text-center mb-8 mt-2">
              <h1 className="text-2xl font-bold text-gray-700"> طرح</h1>
            </div>
            <Grid item xs={12} lg={6}>
              <Box mb={2}>
                <GlobalTextField
                  value={formData.plan_name}
                  label="نام طرح"
                  onChange={(e) => {
                    setFormData({ ...formData, plan_name: e.target.value });
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Box mb={2}>
                <GlobalTextField
                  value={formData.company_name}
                  label="نام شرکت"
                  onChange={(e) => {
                    setFormData({ ...formData, company_name: e.target.value });
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Box mb={2}>
                <GlobalTextField
                  value={formData.symbol}
                  label="نماد"
                  onChange={(e) => {
                    setFormData({ ...formData, symbol: e.target.value });
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Box mb={2}>
                <GlobalTextField
                  type="text"
                  value={formData.funded_amount ? formatNumber(formData.funded_amount) : ''}
                  label="مبلغ تعیین شده"
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, '');
                    setFormData({ ...formData, funded_amount: value });
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Box mb={2}>
                <TextField
                  value={
                    formData.amount_of_shareholders
                      ? formatNumber(formData.amount_of_shareholders)
                      : ''
                  }
                  label="میزان سود"
                  type="number"
                  InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => handlePercentageChange(e, 'amount_of_shareholders')}
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Box mb={2}>
                <GlobalTextField
                  value={formData.total_time}
                  label="مدت کلی"
                  type="text"
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, '');
                    setFormData({ ...formData, total_time: value });
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Box mb={2}>
                <GlobalTextField
                  value={formData.buoyancy}
                  label="شناوری"
                  type="text"
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, '');
                    setFormData({ ...formData, buoyancy: value });
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Box mb={2}>
                <SelectField
                  id="payment_period"
                  value={formData.payment_period}
                  label="دوره پرداخت"
                  options={[
                    { value: '1', label: 'ماهانه' },
                    { value: '3', label: 'سه ماهه' },
                    { value: '6', label: 'شش ماهه' },
                    { value: '12', label: 'دوازده ماهه' },
                  ]}
                  onChange={(e) => {
                    setFormData({ ...formData, payment_period: e.target.value });
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Box mb={2}>
                <SelectField
                  id="status"
                  value={formData.plan_status}
                  label="وضعیت اجرای طرح"
                  options={[
                    { value: '1', label: 'شروع شده' },
                    { value: '2', label: ' جمع آوری شده' },
                    { value: '3', label: 'تمدید شده' },
                    { value: '4', label: 'سررسید ناموفق' },
                    { value: '5', label: 'تکمیل شده' },
                  ]}
                  onChange={(e) => {
                    setFormData({ ...formData, plan_status: e.target.value });
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Box mb={2}>
                <GlobalTextField
                  value={formData.activity_area}
                  label="حوزه فعالیت"
                  onChange={(e) => {
                    setFormData({ ...formData, activity_area: e.target.value });
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} lg={6}>
              <Box mt={-4} mb={3}>
                <Label mb={1}>تاریخ شروع</Label>
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  style={{ minWidth: 560, height: '54px' }}
                  inputStyle={{ height: '100%', width: '100%' }}
                  placeholder="تاریخ شروع"
                  onChange={(value) => {
                    const formattedDate = formatDate(value);
                    setFormData({ ...formData, remaining_from_to: formattedDate });
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} lg={6}>
              <Box mt={-4} mb={3}>
                <Label mb={1}>تاریخ پایان</Label>
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  style={{ minWidth: 560, height: '54px' }}
                  inputStyle={{ height: '100%', width: '100%' }}
                  placeholder="تاریخ پایان"
                  onChange={(value) => {
                    const formattedDate = formatDate(value);
                    setFormData({ ...formData, remaining_date_to: formattedDate });
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} lg={6}>
              <Box mb={2}>
                <GlobalTextField
                  value={formData.farabours_link}
                  label="لینک فرابورس"
                  onChange={(e) => {
                    setFormData({ ...formData, farabours_link: e.target.value });
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Box mb={2}>
                <TextField
                  value={formData.applicant_funding_percentage}
                  label="درصد تامین متقاضی"
                  type="number"
                  InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => handlePercentageChange(e, 'applicant_funding_percentage')}
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Box mb={2}>
                <GlobalTextField
                  value={
                    formData.nominal_price_certificate
                      ? formatNumber(formData.nominal_price_certificate)
                      : ''
                  }
                  type="text"
                  label="قیمت اسمی گواهی"
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, '');
                    setFormData({ ...formData, nominal_price_certificate: value });
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <SubmitButton onClick={handleSubmit} disabled={mutation.isLoading} />
        </DialogActions>
      </Dialog>
    </>
  );
};

PlanCreateModal.propTypes = {
  refetch: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default PlanCreateModal;
