import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi = getCookie('accessApi');

export const getCardStatusRisk = async (cartId) => {
  const response = await api.get(`/api/update/risk/commitee/admin/${cartId}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const postCardStatusRisk = async (id, data) => {
  const response = await api.post(
    `/api/update/risk/commitee/admin/${id}/`,
    {
      risk_committee: data,
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
