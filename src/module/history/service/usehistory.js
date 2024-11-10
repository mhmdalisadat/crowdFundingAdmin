import axios from 'axios';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

const accessApi = getCookie('accessApi');

export const fetchHistory = async (cartId) => {
  const response = await api.get(`/api/history/admin/${cartId}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const uploadHistoryFile = async (cartId, formData) => {  
  const form = new FormData();
  formData.forEach((item) => {
    if (item.file) {
      form.append(item.national_code, item.file);
      form.append(`${item.national_code}_date`, item.date);
    }
  });
  const response = await axios.post(`${OnRun}/api/history/admin/${cartId}/`, form, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
