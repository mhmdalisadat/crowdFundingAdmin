import React from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const PlanDetail = ({ planData }) => {
  const data = planData?.data;

  const formatNumber = (value) => {
    if (value == null) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const formatPaymentPeriod = (value) => {
    switch (value) {
      case 1:
        return 'ماهانه';
      case 3:
        return 'سه ماهه';
      case 6:
        return 'شش ماهه';
      case 12:
        return 'دوازده ماهه';
      default:
        return '';
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1400px',
        padding: 3,
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        margin: '0 auto',
      }}
    >
      <div
        style={{
          backgroundColor: '#e0e0e0',
          color: '#333',
          borderRadius: '16px 16px 0 0',
          padding: '16px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold">
          اطلاعات طرح
        </Typography>
      </div>
      <Box
        sx={{
          padding: 2,
          textAlign: 'center',
        }}
      >
        {data ? (
          <div>
            <Typography variant="h6">{data.plan_name || ''}</Typography>
            <Typography>
              <strong>نام شرکت:</strong> {data.company_name || ''}
            </Typography>
            <Typography>
              <strong>مبلغ تامین شده:</strong> {formatNumber(data.funded_amount) || ''}
            </Typography>
            <Typography>
              <strong>مقدار سود:</strong> {formatNumber(data.funded_amount) || ''}
            </Typography>
            <Typography>
              <strong>شناوری:</strong> {data.buoyancy || ''}
            </Typography>
            <Typography>
              <strong>دوره پرداخت:</strong> {formatPaymentPeriod(data.payment_period) || ''}
            </Typography>
            <Typography>
              <strong>وضعیت اجرای طرح:</strong> {data.plan_status || ''}
            </Typography>
            <Typography>
              <strong>حوزه فعالیت:</strong> {data.activity_field || ''}
            </Typography>
            <Typography>
              <strong>روزهای باقی مانده:</strong> {data.remaining_days || ''}
            </Typography>
            <Typography>
              <strong>بازگردان:</strong> {data.marketer || ''}
            </Typography>
            <Typography>
              <strong>نماد:</strong> {data.symbol || ''}
            </Typography>
            <Typography>
              <strong>لینک فرابورس:</strong> {data.farabours_link || ''}
            </Typography>
            <Typography>
              <strong>درصد تامین متقاضی:</strong> {data.applicant_funding_percentage || ''}
            </Typography>
            <Typography>
              <strong>قیمت اسمی هر گواهی:</strong>{' '}
              {formatNumber(data.nominal_price_certificate) || ''}
            </Typography>
            <Typography>
              <strong>توضیحات:</strong> {data.description || ''}
            </Typography>
          </div>
        ) : (
          <Typography>اطلاعاتی موجود نیست.</Typography>
        )}
      </Box>
    </Box>
  );
};

PlanDetail.propTypes = {
  planData: PropTypes.object,
};

export default PlanDetail;
