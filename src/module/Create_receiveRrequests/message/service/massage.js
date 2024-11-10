import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi = getCookie('accessApi');

export const sendMessage = async (cardSelected, message, sendStatus) => {
  const url = `/api/message/admin/${cardSelected}/`;
  const response = await api.post(
    url,
    {
      message,
      send_sms: sendStatus,
    },
    {
      headers: {
        Authorization: `Bearer ${accessApi}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const fetchUserMessage = async (cardSelected) => {
  const response = await api.get(`/api/message/admin/${cardSelected}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });  
  return response.data;
};
