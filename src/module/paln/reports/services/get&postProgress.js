import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi = getCookie('accessApi');

export const GetProgress = async (trace_code) => {
  const response = await api.get(`/api/progres/report/admin/${trace_code}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const PostProgress = async (trace_code, postData) => {
  const formData = new FormData();

  if (postData.file) {
    formData.append('file', postData.file);
  }
  if (postData.title) {
    formData.append('title', postData.title);
  }
  const response = await api.post(`/api/progres/report/admin/${trace_code}/`, formData, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const DeleteProgress = async (docId) => {
  const response = await api.delete(`/api/progres/report/admin/${docId}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
