import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi = getCookie('accessApi');

export const GetGuarante = async (trace_code) => {

  

  const response = await api.get(`/api/appendices/${trace_code}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const PostGuarante = async (trace_code,data) => {

  const formData = new FormData();

  if (data.file) {
    formData.append('file', data.file);
  }
  if (data.title) {
    formData.append('title', data.title);
  }
  const response = await api.post(`/api/appendices/${trace_code}/`, formData, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const DeleteGuarante = async (docId) => {
  const response = await api.delete(`/api/appendices/${docId}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
