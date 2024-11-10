/* eslint-disable consistent-return */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

export default function RequestView() {

  
  return (
    <div className='grid grid-rows-1'>
      <Typography
        variant="h5"
        sx={{ marginBottom: '24px', textAlign: 'center', fontWeight: 'bold' }}
      >
        درخواست‌ها
      </Typography>
      <Grid container spacing={4} marginTop={30} justifyContent="center">
       <Typography>به زودی...&#128512;</Typography>
      </Grid>
    </div>
  );
}
