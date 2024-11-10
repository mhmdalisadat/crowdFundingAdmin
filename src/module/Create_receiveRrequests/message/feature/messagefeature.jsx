import { Box, FormControlLabel, Switch, TextareaAutosize } from '@mui/material';
import PropTypes from 'prop-types';

const MessageFeature = ({ sendStatus, messageContent, setMessageContent, setSendStatus }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2,
    }}
  >
    <TextareaAutosize
      placeholder="متن پیام خود را بنویسید..."
      minRows={4}
      value={messageContent}
      onChange={(e) => setMessageContent(e.target.value)}
      style={{
        width: '100%',
        padding: '16px',
        border: '1px solid #1e88e5',
        borderRadius: '8px',
        outline: 'none',
        resize: 'none',
        boxSizing: 'border-box',
      }}
    />
    <FormControlLabel
      control={<Switch checked={sendStatus} onChange={(e) => setSendStatus(e.target.checked)} />}
      label="وضعیت ارسال پیام"
    />
  </Box>
);

MessageFeature.propTypes = {
  sendStatus: PropTypes.bool, 
  messageContent: PropTypes.string,
  setMessageContent: PropTypes.func, 
  setSendStatus: PropTypes.func,
};

export default MessageFeature;
