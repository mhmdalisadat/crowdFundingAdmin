/* eslint-disable react/no-unknown-property */
/* eslint-disable arrow-body-style */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Switch, FormControl, FormLabel, Input, Button } from '@mui/material';
import { OnRun } from 'src/api/OnRun';

const SwitchWithFileInput = ({
  switchLabel,
  fileKey,
  localData,
  setLocalData,
  handleFileRemove,
}) => {  
  return (
    <Box sx={{ marginBottom: '16px' }}>
      <div dir="ltr">
        <Switch
          name={fileKey}
          inputProps={{ 'aria-label': 'controlled' }}
          className="mr-4"
          checked={localData[`lock_${fileKey}`]}
          onClick={() =>
            setLocalData({ ...localData, [`lock_${fileKey}`]: !localData[`lock_${fileKey}`] })
          }
        />
      </div>
      <FormControl fullWidth>
        <FormLabel
          sx={{
            color: '#424242',
            fontSize: '14px',
            fontWeight: 'medium',
            marginBottom: '8px',
            display: 'block',
          }}
        >
          {switchLabel}
        </FormLabel>
        {typeof localData[fileKey] === 'string' ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#f7f7f7',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            <a
              href={`${OnRun}${localData[fileKey]}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontSize: '14px',
                fontWeight: 'medium',
              }}
            >
              {`فایل ${switchLabel}`}
            </a>
            <Button onClick={() => handleFileRemove(fileKey)}>حذف</Button>
          </Box>
        ) : (
          <Input
            name={fileKey}
            type="file"
            onChange={(e) => setLocalData({ ...localData, [fileKey]: e.target.files[0] })}
            sx={{
              borderRadius: '8px',
              width: '100%',
              color: '#424242',
              '&:focus': {
                outline: 'none',
                borderColor: '#3f51b5',
                boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
              },
            }}
          />
        )}
      </FormControl>
    </Box>
  );
};

SwitchWithFileInput.propTypes = {
  switchLabel: PropTypes.string,
  fileKey: PropTypes.string,
  localData: PropTypes.object,
  setLocalData: PropTypes.func,
  handleFileRemove: PropTypes.func,
};

export default SwitchWithFileInput;
