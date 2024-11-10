import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

export const fetchPayment = async () => {
  const accessApi =  getCookie('accessApi');

  const response = await api.get(`/api/transaction/admin/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data.transaction;
};
