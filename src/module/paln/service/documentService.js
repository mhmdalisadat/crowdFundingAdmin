import axios from 'axios';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

const accessApi =  getCookie('accessApi');  

export const fetchDocument = async (id) => {
  const response = await api.get(`/api/documentation/admin/${id}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const sendDocument = async (id, data) => {
  const form = new FormData();
  
  data.forEach((element) => {
    if (element.file) {
      form.append('file', element.file); 
    }
    if (element.title) {
      form.append('title', element.title);  
    }
  });

  const response = await axios.post(`${OnRun}/api/documentation/admin/${id}/`, form, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
    },
  });

  return response.data;
};
