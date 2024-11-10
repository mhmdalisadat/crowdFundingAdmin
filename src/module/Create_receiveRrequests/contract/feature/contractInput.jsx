/* eslint-disable no-restricted-globals */
import React from 'react';
import { Grid, Switch } from '@mui/material';
import GlobalTextField from 'src/components/fild/textfiled';
import PropTypes from 'prop-types';

const ContentInput = ({ contractData, setContractData }) => {
  const fielsLabels = [
    {
      label: 'کارمزد فرابورس',
      key: 'otc_fee',
    },
    {
      label: 'کارمزد انتشار',
      key: 'publication_fee',
    },
    {
      label: 'کارمزد ارائه خدمات',
      key: 'dervice_fee',
    },
    {
      label: 'کارمزد طراحی',
      key: 'design_cost',
    },
    {
      label: 'دوره بازپرداخت',
      key: 'payback_period',
      lockKey: 'lock_payback_period',
    },
    {
      label: 'دوره تامین مالی',
      key: 'swimming_percentage',
      lockKey: 'lock_swimming_percentage',
    },
    {
      label: 'سود مشارکت اسمی',
      key: 'partnership_interest',
      lockKey: 'lock_partnership_interest',
    },
    {
      label: 'ضمانت نامه',
      key: 'guarantee',
      lockKey: 'lock_guarantee',
    },
  ];

  const formatNumber = (value) => {
    if (value == null) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleTextFieldChange = (key) => (event) => {
    const rawValue = event.target.value.replace(/,/g, '');
    setContractData({
      ...contractData,
      [key]: rawValue,
    });
  };

  const handleBlur = (key) => (event) => {
    const numericValue = parseFloat(event.target.value.replace(/,/g, ''));
    setContractData({
      ...contractData,
      [key]: isNaN(numericValue) ? '' : numericValue,
    });
  };

  const handleLockChange = (lockKey) => (event) => {
    setContractData({
      ...contractData,
      [lockKey]: event.target.checked,
    });
  };

  return (
    <Grid container spacing={2}>
      {fielsLabels.map(({ label, key, lockKey }) => (
        <Grid item xs={12} sm={6} md={4} key={key}>
          <div dir="ltr" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {lockKey && (
              <Switch
                checked={contractData[lockKey] || false}
                onChange={handleLockChange(lockKey)}
              />
            )}

            <GlobalTextField
              label={label}
              value={formatNumber(contractData[key]) || ''}
              onChange={handleTextFieldChange(key)}
              onBlur={handleBlur(key)}
              disabled={lockKey && contractData[lockKey]}
            />
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

ContentInput.propTypes = {
  contractData: PropTypes.object,
  setContractData: PropTypes.func,
};

export default ContentInput;
