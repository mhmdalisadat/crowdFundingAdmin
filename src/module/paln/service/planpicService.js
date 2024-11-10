import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi = getCookie('accessApi');

export const sendPic = async (id, file) => {
  const url = `/api/plan/admin/${id}/`;
  const formData = new FormData();
    formData.append('picture', file); 
  const response = await api.post(url, formData, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
