import axios from 'axios';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

const accessApi =  getCookie('accessApi');

export const fetchGuarante = async (id) => {
  const response = await api.get(`/api/appendices/admin/${id}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const sendGuarante = async (id, data) => {
  const form = new FormData();
  
  data.forEach((element, index) => {
    if (element.file) {
      form.append('file', element.file);  
    }
    if (element.title) {
      form.append('title', element.title);  
    }
  });

  const response = await axios.post(`${OnRun}/api/appendices/admin/${id}/`, form, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
    },
  });

  return response.data;
};
