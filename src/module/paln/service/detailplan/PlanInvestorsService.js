import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi =  getCookie('accessApi');

export const fetchPlanInvestors = async (trace_code) => {
  const response = await api.get(`/api/participant/${trace_code}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data.data;
};
