import * as React from 'react';
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { fetchUserMessage, sendMessage } from 'src/hook/message';
import { useQuery, useMutation } from '@tanstack/react-query';

const SendMessage = ({ cardSelected, open, onClose }) => {
  const { data } = useQuery({
    queryKey: ['userMessage', cardSelected],
    queryFn: () => fetchUserMessage(cardSelected),
  });

  const [messageContent, setMessageContent] = React.useState('');
  const [sendStatus, setSendStatus] = React.useState(false);

  const mutation = useMutation({
    mutationKey: ['sendMessage', cardSelected],
    mutationFn: () => sendMessage(cardSelected, messageContent, sendStatus),
  });

  const handleSendMessage = () => {
    mutation.mutate({ content: messageContent, send_sms: sendStatus });
    onClose();
  };
  React.useEffect(() => {
    setMessageContent(data?.message?.message);
  }, [data]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        ارسال پیام
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
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
            control={
              <Switch checked={sendStatus} onChange={(e) => setSendStatus(e.target.checked)} />
            }
            label="وضعیت ارسال پیام"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#1565c0',
            color: 'white',
            '&:hover': {
              backgroundColor: '#0d47a1',
            },
          }}
          size="medium"
          endIcon={<ArrowBackIosIcon />}
          onClick={handleSendMessage}
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? 'در حال ارسال...' : 'ارسال'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

SendMessage.propTypes = {
  cardSelected: PropTypes.number,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default SendMessage;
