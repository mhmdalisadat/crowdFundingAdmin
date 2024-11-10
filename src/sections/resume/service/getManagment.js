import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const getManagement = async (id) => {
  const accessApi = getCookie('accessApi');
  const response = await api.get(`/api/manager/${id}/`, {
    headers: { Authorization: `Bearer ${accessApi}` },
  });

  return response.data.data;
};

export default getManagement;
