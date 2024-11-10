import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormControlLabel, FormGroup, Switch, Box, Grid } from '@mui/material';

const SwitchContract = ({ contractData, setContractData }) => {
  const switchLabels = [
    { label: 'تطابق با ماده ۱۴۱ قانون تجارت', key: 'role_141' },
    { label: 'وضعیت چک‌های برگشتی', key: 'bounced_check' },
    { label: 'وضعیت بدهی‌های جاری غیرمجاز', key: 'non_current_debt' },
    { label: 'سابقه جرائم کیفری', key: 'criminal_record' },
    { label: 'وضعیت ممنوع‌المعامله بودن', key: 'Prohibited' },
    { label: 'واریز ۱۰ درصد سرمایه', key: 'minimum_deposit_10' },
  ];

  const handleSwitchChange = (key) => (event) => {
    setContractData((prevData) => ({
      ...prevData,
      [key]: event.target.checked,
    }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '25vh',
        margin: 2,
      }}
    >
      <Box
        sx={{
          padding: 2,
          backgroundColor: '#fff',
          borderRadius: '16px',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '600px',
        }}
      >
        <FormControl component="fieldset">
          <FormGroup>
            <Grid container spacing={1}>
              {switchLabels.map(({ label, key }) => (
                <Grid item xs={12} key={key}>
                  <FormControlLabel
                    control={
                      <Switch
                        size="small"
                        checked={contractData[key] || false}
                        onChange={handleSwitchChange(key)}
                      />
                    }
                    label={label}
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  />
                </Grid>
              ))}
            </Grid>
          </FormGroup>
        </FormControl>
      </Box>
    </Box>
  );
};

SwitchContract.propTypes = {
  contractData: PropTypes.object.isRequired,
  setContractData: PropTypes.func.isRequired,
};

export default SwitchContract;
