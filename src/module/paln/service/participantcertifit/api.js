import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi = getCookie('accessApi');

export const postParticipant = async ({ data, trace_code }) => {
  const response = await api.post(`/api/send/participation/certificate/farabours/admin/${trace_code}/`, data, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
