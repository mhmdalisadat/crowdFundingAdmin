import { Box, Divider, FormControlLabel, IconButton, Switch } from '@mui/material';
import PropTypes from 'prop-types';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ManagerInput from './managerInput';

const ManagerFeatuer = ({
  handleChange,
  section,
  sectionIndex,
  formSections,
  handleRemoveSection,
}) => (
  <form key={sectionIndex} className="w-full">
    <FormControlLabel
      control={
        <Switch
          checked={section.lock}
          onChange={(e) => handleChange(sectionIndex, 'lock', e.target.checked)}
        />
      }
    />
    <Box
  sx={{
    display: 'grid',
    gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
    gap: 4,
    marginBottom: 4,
    boxShadow: 6,
    padding: 10,
    position: 'relative',
  }}
>

      <ManagerInput section={section} sectionIndex={sectionIndex} handleChange={handleChange} />
      {formSections.length > 1 && (
        <IconButton
          color="error"
          sx={{ position: 'absolute', top: 0, right: 0 }}
          onClick={() => handleRemoveSection(sectionIndex)}
        >
          <HighlightOffIcon />
        </IconButton>
      )}
    </Box>

    {sectionIndex < formSections.length - 1 && <Divider sx={{ marginY: 4 }} />}
  </form>
);
ManagerFeatuer.propTypes = {
  handleChange: PropTypes.func,
  section: PropTypes.object,
  sectionIndex: PropTypes.number,
  formSections: PropTypes.array,
  handleRemoveSection: PropTypes.func,
};
export default ManagerFeatuer;
