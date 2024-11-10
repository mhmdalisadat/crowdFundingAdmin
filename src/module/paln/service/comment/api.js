import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi = getCookie('accessApi');

export const getComment = async (trace_code) => {
  const response = await api.get(`/api/comment/admin/${trace_code}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const postComment = async (id, data) => {
  const response = await api.patch(
    `/api/comment/admin/${id}/`,
    {
      status: data.status,
      answer: data.answer,
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
