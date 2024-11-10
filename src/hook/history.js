import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

export const fetchHistory = async (id) => {
  try {
    const access = await getCookie('access');

    const response = await api.get(`/api/history/admin/${id}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching history data:', error);
    throw new Error('Failed to fetch history data.');
  }
};


