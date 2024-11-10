import React, { useState } from 'react';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

const MotionButton = motion.create(Button);

const SubmitButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <MotionButton
      type="button"
      variant="contained"
      color="primary"
      sx={{
        width: '100%',
        py: 1,
        px: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: isHovered ? '#1976d2' : '#2196f3',
        transition: 'background-color 0.3s ease',
        '&:hover': {
          backgroundColor: '#1976d2',
        },
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1, scale: 1.1 }}
          exit={{ x: 30, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 80 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', direction: 'rtl', gap: 6 }}>
            ذخیره تغییرات
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <SaveAltIcon />
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <motion.span
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1, scale: 1.1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          تایید
        </motion.span>
      )}
    </MotionButton>
  );
};

SubmitButton.propTypes = {
  onClick: PropTypes.func,
};

export default SubmitButton;
