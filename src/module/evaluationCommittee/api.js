import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi = getCookie('accessApi');

export const getCardStatusEvaluation = async (cartId) => {
  const response = await api.get(`/api/update/evaluation/commitee/admin/${cartId}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const postCardStatusEvaluation = async (id, data) => {
  const response = await api.post(
    `/api/update/evaluation/commitee/admin/${id}/`,
    {
      evaluation_committee: data,
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

