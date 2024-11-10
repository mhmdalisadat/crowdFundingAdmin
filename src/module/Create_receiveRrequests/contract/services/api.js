import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

export const getcontract = async (cartId) => {
  const accessApi = getCookie('accessApi');

  const response = await api.get(`/api/setcart/admin/${cartId}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};