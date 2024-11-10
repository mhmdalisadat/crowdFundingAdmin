import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi = getCookie('accessApi');

export const fetchManager = async (id) => {
  const response = await api.get(`/api/manager/admin/${id}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data.data;
};

export const sendManager = async (id, data) => {
  const response = await api.post(`/api/manager/admin/${id}/`, (data = { managers: data }), {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
