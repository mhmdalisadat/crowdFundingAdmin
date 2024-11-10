/* eslint-disable no-return-assign */
import { Box, Divider, FormControlLabel, IconButton, Switch } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PropTypes from 'prop-types';
import ShareholderInput from './shreholserInput';

const ShareholderFeature = ({
  sectionIndex,
  section,
  handleChange,
  formSections,
  handleOpenDialog,
}) => (
    <form key={sectionIndex} className="w-full">
     <FormControlLabel
          control={
            <Switch
              checked={section.lock}
              onChange={(e) => handleChange(sectionIndex, 'lock', e.target.checked)}
            />
          }
          sx={{ gridColumn: 'span 3', alignSelf: 'center' }}
        />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
          gap: 2,
          marginBottom: 4,
          boxShadow: 6,
          padding: 6,
          position: 'relative',
        }}
      >
        <ShareholderInput
          sectionIndex={sectionIndex}
          section={section}
          handleChange={handleChange}
        />
       
        {formSections.length > 1 && (
          <IconButton
            color="error"
            sx={{ position: 'absolute', top: 0, right: 0 }}
            onClick={() => handleOpenDialog(sectionIndex)}
          >
            <HighlightOffIcon />
          </IconButton>
        )}
      </Box>
      {sectionIndex < formSections.length - 1 && <Divider sx={{ marginY: 4 }} />}
    </form>
  );

ShareholderFeature.propTypes = {
  handleChange: PropTypes.func,
  sectionIndex: PropTypes.number,
  section: PropTypes.object,
  formSections: PropTypes.array,
  handleOpenDialog: PropTypes.func,
};

export default ShareholderFeature;
