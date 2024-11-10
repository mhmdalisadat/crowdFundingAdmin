import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi = getCookie('accessApi');

export const GetDocument = async (trace_code) => {
  const response = await api.get(`/api/documentation/${trace_code}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const PostDocument = async (trace_code, postData) => {
  const formData = new FormData();

  if (postData.file) {
    formData.append('file', postData.file);
  }
  if (postData.title) {
    formData.append('title', postData.title);
  }
  const response = await api.post(`/api/documentation/${trace_code}/`, formData, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const DeleteDocument = async (docId) => {
  const response = await api.delete(`/api/documentation/${docId}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
