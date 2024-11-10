import React from 'react';
import { Box, Grid, InputAdornment, TextField } from '@mui/material';
import SelectField from 'src/components/fild/selectedfiled';
import GlobalTextField from 'src/components/fild/textfiled';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import PropTypes from 'prop-types';

const formatNumber = (value) => {
  if (value == null) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const PlanFeature = ({ item, index, setPlanData, handleInputChange }) => {
  const durationOptions = [
    { value: '1', label: 'ماهانه' },
    { value: 987, label: 'سه ماهه' },
    { value: '6', label: 'شش ماهه' },
    { value: '12', label: 'دوازده ماهه' },
  ];

  const statusOptions = [
    { value: '2', label: 'لغو شده' },
    { value: '1', label: 'در حال اجرا' },
    { value: '5', label: 'تکمیل شده' },
    { value: '3', label: 'در انتظار' },
    { value: '4', label: 'کنسل شده' },
  ];

  const getLabelFromValue = (value) => {
    const option = durationOptions.find((opt) => opt.value === value);
    return option ? option.label : '';
  };

  return (
    <div>
      <Grid container spacing={2} key={index}>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <GlobalTextField
              value={item.plan_name}
              label="نام طرح"
              onChange={(e) => handleInputChange('plan_name', e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <GlobalTextField
              value={item.company_name}
              label="نام شرکت"
              onChange={(e) => handleInputChange('company_name', e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <GlobalTextField
              value={item.symbol}
              label="نماد"
              onChange={(e) => handleInputChange('symbol', e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <GlobalTextField
              value={formatNumber(item.funded_amount)}
              label="مبلغ تایین شده"
              onChange={(e) => handleInputChange('funded_amount', e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <TextField
              label="میزان سود"
              value={item.profit || ''}
              type="text"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              variant="outlined"
              fullWidth
              onChange={(e) => handleInputChange('profit', e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <GlobalTextField
              value={item.total_time}
              label="مدت کلی"
              onChange={(e) => handleInputChange('total_time', e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <GlobalTextField
              value={item.buoyancy}
              label="شناوری"
              onChange={(e) => handleInputChange('buoyancy', e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <SelectField
              id="payment_period"
              label="دوره پرداخت"
              value={getLabelFromValue(item.payment_period)} 
              options={durationOptions}
              onChange={(value) => handleInputChange('payment_period', value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <SelectField
              id="status"
              label="وضعیت اجرای طرح"
              value={item.plan_status}
              options={statusOptions}
              onChange={(value) => handleInputChange('plan_status', value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <GlobalTextField
              value={item.activity_field}
              label="حوزه فعالیت"
              onChange={(e) => handleInputChange('activity_field', e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <DatePicker
              range
              dateSeparator=" تا "
              calendar={persian}
              locale={persian_fa}
              value={item.remaining_days}
              calendarPosition="bottom-right"
              style={{ width: '233%', height: '56px' }}
              inputStyle={{ height: '100%', width: '100%' }}
              placeholder="روز های باقی مانده"
              onChange={(value) => handleInputChange('remaining_days', value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <GlobalTextField
              value={item.marketer}
              label="بازگردان"
              onChange={(e) => handleInputChange('marketer', e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <GlobalTextField
              value={item.farabours_link}
              label="لینک فرابورس"
              onChange={(e) => handleInputChange('farabours_link', e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <TextField
              label="درصد تامین متقاضی"
              value={item.applicant_funding_percentage || ''}
              type="text"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              variant="outlined"
              fullWidth
              onChange={(e) => handleInputChange('applicant_funding_percentage', e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box mb={2}>
            <GlobalTextField
              label="قیمت اسمی هرگواهی"
              value={formatNumber(item.nominal_price_certificate)}
              onChange={(e) => handleInputChange('nominal_price_certificate', e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Box mb={2}>
            <GlobalTextField
              value={item.description}
              label="توضیحات"
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

PlanFeature.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  setPlanData: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func,
};

export default PlanFeature;
