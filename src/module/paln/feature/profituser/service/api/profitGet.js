import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi =  getCookie('accessApi');

export const GetProfit = async (trace_code) => {
  const response = await api.get(`/api/report/admin/profitability/${trace_code}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
