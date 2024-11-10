import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi = getCookie('accessApi');

export const getHistory = async (cartId) => {
  const response = await api.get(`/api/history/admin/${cartId}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const postHistory = async ({ cartId, formData }) => {
  const form = new FormData();
  for (let index = 0; index < formData.length; index += 1) {
    const element = formData[index];

    if (element.file && typeof element.file !== 'string') {
      form.append(element.national_code, element.file);
    }
    
    form.append(`lock_${element.national_code}`, element.lock);

    if (element.date) {
      const timestamp = new Date(element.date).getTime();
      form.append(`${element.national_code}_date`, timestamp);
    }
  }
  const response = await api.post(`/api/history/admin/${cartId}/`, form, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
