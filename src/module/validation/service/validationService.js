import axios from 'axios';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

const accessApi =  getCookie('accessApi');

export const fetchValidation = async (id) => {
  const response = await api.get(`/api/validation/admin/${id}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });
  
  return response.data;
};

export const sendValidation = async (id, data) => {
  const form = new FormData();
  for (let index = 0; index < data.length; index += 1) {
    const element = data[index];
    form.append(element.national_code, element.file);
    form.append(`${element.national_code}_date`, element.date);
  }

  const response = await axios.post(`${OnRun}/api/validation/admin/${id}/`, form, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
