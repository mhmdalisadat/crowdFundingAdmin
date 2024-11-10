import axios from 'axios';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

export const fetchManager = async (id) => {
  try {
    const access = await getCookie('access');
    
    const response = await api.get(`/api/manager/admin/${id}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching manager data:', error);
    throw new Error('Failed to fetch manager data.');
  }
};

export const sendManager = async (id, data) => {
  try {
    const access = await getCookie('access');
    const url = `${OnRun}/api/manager/admin/${id}/`;

    const response = await axios.post(url, data={managers:data}, {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error sending manager data:', error);
    throw new Error('Failed to send manager data.');
  }
};
