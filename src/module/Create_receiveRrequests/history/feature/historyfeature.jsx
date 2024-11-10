import { Box, FormControlLabel, Switch } from '@mui/material';
import PropTypes from 'prop-types';
import HistoryInput from './historyInput';

const HistoryFeature = ({
  handleFileChange,
  handleRemoveFile,
  handleSwitchChange,
  handleTextFieldChange,
  item,
  index,
  setFormData,
}) => (
  <form key={index} className="w-full">
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
      }}
    >
      <FormControlLabel
        control={
          <Switch
            checked={item.lock}
            onChange={handleSwitchChange(index)}
            name="customSwitch"
            color="primary"
          />
        }
      />
    </Box>
    <Box
      sx={{
       
        width : "100%",
        display: 'flex',
        gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr', md: '1fr 1fr 1fr 1fr' },
        gap: 2,
        marginBottom: 4,
      }}
    >
      <HistoryInput
        item={item}
        index={index}
        handleTextFieldChange={handleTextFieldChange}
        handleSwitchChange={handleSwitchChange}
        handleRemoveFile={handleRemoveFile}
        handleFileChange={handleFileChange}
        setFormData={setFormData}
      />
    </Box>
  </form>
);
HistoryFeature.propTypes = {
  handleFileChange: PropTypes.func,
  handleRemoveFile: PropTypes.func,
  handleSwitchChange: PropTypes.func,
  handleTextFieldChange: PropTypes.func,
  item: PropTypes.object,
  index: PropTypes.number,
  setFormData: PropTypes.func,
};

export default HistoryFeature;
