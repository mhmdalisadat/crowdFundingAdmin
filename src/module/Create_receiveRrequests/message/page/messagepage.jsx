import { useMutation, useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { fetchUserMessage } from 'src/hook/message';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import UseCartId from 'src/hooks/card_id';
import { sendMessage } from '../service/massage';
import MessageFeature from '../feature/messagefeature';

const MessagePage = ({ open, onClose }) => {
  const { cartId } = UseCartId([]);

  const { data } = useQuery({
    queryKey: ['userMessage', cartId],
    queryFn: () => fetchUserMessage(cartId),
  });

  const [messageContent, setMessageContent] = useState('');
  const [sendStatus, setSendStatus] = useState(() => {
    const savedStatus = localStorage.getItem('sendStatus');
    return savedStatus === 'true'; // به boolean تبدیل کنید
  });

  const mutation = useMutation({
    mutationKey: ['sendMessage', cartId],
    mutationFn: () => sendMessage(cartId, messageContent, sendStatus),
  });

  const handleSendMessage = () => {
    mutation.mutate();
    onClose();
  };

  useEffect(() => {
    if (data?.message) {
      setMessageContent(data.message);
    }
  }, [data]);

  useEffect(() => {
    if (data?.status) {
      setSendStatus(data.status);
    }
  }, [data]);

  // ذخیره کردن sendStatus در localStorage
  useEffect(() => {
    localStorage.setItem('sendStatus', sendStatus);
  }, [sendStatus]);

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
        <MessageFeature
          sendStatus={sendStatus}
          messageContent={messageContent}
          setMessageContent={setMessageContent}
          setSendStatus={setSendStatus}
        />
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

MessagePage.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default MessagePage;
