import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi = getCookie('accessApi');

export const getGuaranty = async (trace_code) => {
  const response = await api.get(`/api/warranty/admin/${trace_code}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

export const PostGuaranty = async (trace_code, dataToSubmit) => {
  const response = await api.post(`/api/warranty/admin/${trace_code}/`, dataToSubmit, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

export const DeleteGuaranty = async (trace_code, docId) => {
  const response = await api.delete(`/api/warranty/admin/${trace_code}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
    data: { id: docId },
  });

  return response.data;
};

export const UpdateGuaranty = async (trace_code, updateData) => {
  const response = await api.patch(`/api/warranty/admin/${trace_code}/`, updateData, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
