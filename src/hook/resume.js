import axios from 'axios';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

export const fetchResume = async (id) => {
  try {
    const access = await getCookie('access');

    const response = await api.get(`/api/resume/admin/${id}/`, {
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

export const sendResume = async (id, data) => {
  try {
    const access = await getCookie('access');
    const url = `${OnRun}/api/resume/admin/${id}/`;
    const form = new FormData();

    for (let index = 0; index < data.length; index += 1) {
      const element = data[index];
      form.append(element.national_code, element.file);
    }

    const response = await axios.post(url, form, {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error sending resume data:', error);
    throw new Error('Failed to send resume data.');
  }
};
