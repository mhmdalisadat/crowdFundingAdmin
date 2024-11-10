import React, { useState } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion'; 

const AddFormButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false); 

  return (
    <Button
      variant="outlined"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)} 
      sx={{
        width: '60%',
        py: 1,
        px: 2,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      افزودن فرم جدید
      {isHovered && (
        <motion.div
          initial={{ x: -210, opacity: 0 }}
          animate={{ x: 150, opacity: 1 }}
          exit={{ x: -210, opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'absolute',
            left: 10,
          }}
        >
          <AddIcon />
        </motion.div>
      )}
    </Button>
  );
};

AddFormButton.propTypes = {
  onClick: PropTypes.func,
};

export default AddFormButton;
