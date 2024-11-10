/* eslint-disable react/prop-types */

import { useState } from 'react';
import { Box, ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';
import AddInfo from '../addInformation';
import PlanAddPic from '../planAddPic';

const TabPanel = ({ children, value, index, ...other }) => (
  <div role="tabpanel" hidden={value !== index} {...other}>
    {value === index && (
      <Box sx={{ padding: 3 }}>
        <Typography>{children}</Typography>
      </Box>
    )}
  </div>
);

const InformationPage = () => {
  const [tabValue, setTabValue] = useState('');

  const handleChange = (event, newValue) => {
    if (newValue !== null) setTabValue(newValue);
  };

  return (
    <Box mt={2} sx={{ width: '100%', textAlign: 'center' }}>
      <ToggleButtonGroup
        color="primary"
        value={tabValue}
        variant="contained"
        exclusive
        onChange={handleChange}
        aria-label="information options"
        sx={{ marginBottom: 2 }}
      >
        <ToggleButton value="pic">افزودن عکس</ToggleButton>
        <ToggleButton value="info">افزودن اطلاعات تکمیلی</ToggleButton>
      </ToggleButtonGroup>

      <TabPanel value={tabValue} index="pic">
        <PlanAddPic />
      </TabPanel>
      <TabPanel value={tabValue} index="info">
        <AddInfo />
      </TabPanel>
    </Box>
  );
};

export default InformationPage;
