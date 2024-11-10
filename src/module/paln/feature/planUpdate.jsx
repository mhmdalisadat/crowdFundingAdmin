import React, { useEffect, useState } from 'react';
import { Box, Grid, InputAdornment, TextField, CircularProgress } from '@mui/material';
import DatePicker from 'react-multi-date-picker';
import { useMutation } from '@tanstack/react-query';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import SelectField from 'src/components/fild/selectedfiled';
import { SubmitButton } from 'src/components/button';
import PropTypes from 'prop-types';
import GlobalTextField from 'src/components/fild/textfiled';
import { toast, ToastContainer } from 'react-toastify';
import Label from 'src/components/label';
// import { UpdatePlan } from '../service/planDetailService';
import { durationOptions, statusOptions } from './planUpdateInfo';

const formatNumber = (num) => {
  if (!num) return '';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const PlanUpdate = ({ planData, idRow, refetch }) => {
  const [data, setData] = useState(planData?.data || {});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (planData) {
      setData(planData.data);
      setLoading(false);
    }
  }, [planData]);

  const mutation = useMutation({
    onSuccess: () => {
      toast.success('تغییرات شما با موفقیت اعمال شد');
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDateRemaining_from_to = (date) => {
    const updatedData = { ...data };
    updatedData.remaining_from_to = new Date(date).toISOString();
    setData(updatedData);
  };

  const handleDateRemaining_date_to = (date) => {
    const updatedData = { ...data };
    updatedData.remaining_date_to = new Date(date).toISOString();
    setData(updatedData);
  };

  const handelClick = () => {
    mutation.mutate();
  };

  const handleChange = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <ToastContainer />
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <GlobalTextField
              value={data.plan_name || ''}
              label="نام طرح"
              onChange={(e) => handleChange('plan_name', e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <GlobalTextField
              value={data.company_name || ''}
              label="نام شرکت"
              onChange={(e) => handleChange('company_name', e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <GlobalTextField
              value={data.symbol || ''}
              label="نماد"
              onChange={(e) => handleChange('symbol', e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <GlobalTextField
              type="text"
              value={data.funded_amount ? formatNumber(data.funded_amount) : ''}
              label="مبلغ تعیین شده"
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, '');
                handleChange('funded_amount', value);
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <TextField
              value={data.amount_of_shareholders}
              label="میزان سود"
              type="number"
              InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
              variant="outlined"
              fullWidth
              onChange={(e) => {
                const { value } = e.target;
                if (value <= 100) {
                  handleChange('amount_of_shareholders', value);
                }
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <GlobalTextField
              value={data.total_time || ''}
              label="مدت کلی"
              type="number"
              onChange={(e) => handleChange('total_time', e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <GlobalTextField
              value={data.buoyancy || ''}
              label="شناوری"
              type="number"
              onChange={(e) => handleChange('buoyancy', e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <SelectField
              id="payment_period"
              value={data.payment_period || ''}
              label="دوره پرداخت"
              options={durationOptions}
              onChange={(e) => handleChange('payment_period', e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <SelectField
              id="status"
              value={data.plan_status || ''}
              label="وضعیت اجرای طرح"
              options={statusOptions}
              onChange={(e) => handleChange('plan_status', e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <GlobalTextField
              value={data.activity_field || ''}
              label="حوزه فعالیت"
              onChange={(e) => handleChange('activity_field', e.target.value)}
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
              style={{ minWidth: 640, height: '54px' }}
              inputStyle={{ height: '100%', width: '100%' }}
              placeholder="تاریخ شروع"
              value={data.remaining_date_to ? new Date(data.remaining_date_to) : null}
              onChange={handleDateRemaining_date_to}
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
              style={{ minWidth: 640, height: '54px' }}
              inputStyle={{ height: '100%', width: '100%' }}
              placeholder="تاریخ پایان"
              value={data.remaining_from_to ? new Date(data.remaining_from_to) : null}
              onChange={handleDateRemaining_from_to}
            />
          </Box>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <GlobalTextField
              value={data.farabours_link || ''}
              label="لینک فرابورس"
              onChange={(e) => handleChange('farabours_link', e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <TextField
              value={data.applicant_funding_percentage || ''}
              label="درصد تامین متقاضی"
              type="text"
              InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
              variant="outlined"
              fullWidth
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, '');
                if (/^\d*$/.test(value) && (value === '' || Number(value) <= 100)) {
                  handleChange('applicant_funding_percentage', value);
                }
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <GlobalTextField
              value={
                data.nominal_price_certificate ? formatNumber(data.nominal_price_certificate) : ''
              }
              type="text"
              label="قیمت اسمی هر گواهی"
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, '');
                const numericValue = value.replace(/[^0-9]/g, '');
                handleChange('nominal_price_certificate', numericValue);
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} lg={12}>
          <Box mb={2}>
            <TextField
              value={data.description || ''}
              label="توضیحات"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <SubmitButton onClick={handelClick} disabled={mutation.isLoading} />
        </Grid>
      </Grid>
    </>
  );
};

PlanUpdate.propTypes = {
  planData: PropTypes.object.isRequired,
  idRow: PropTypes.number.isRequired,
  refetch: PropTypes.func,
};

export default PlanUpdate;
