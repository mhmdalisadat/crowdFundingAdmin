import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi = getCookie('accessApi');

export const fetchShareholder = async (cartId) => {  
  const response = await api.get(`/api/shareholder/admin/${cartId}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

export const sendShareholder = async (cartId, formSections) => {  
  const response = await api.post(
    `/api/shareholder/admin/${cartId}/`,
    (formSections = { shareholder: formSections }),
    {
      headers: {
        Authorization: `Bearer ${accessApi}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};
