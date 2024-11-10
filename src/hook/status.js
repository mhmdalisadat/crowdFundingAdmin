import api from "src/api/apiClient";
import { getCookie } from "src/api/cookie";



export const fetchStatus = async (id) => {
  
    try {
      const access = await getCookie('access');
      
      const response = await api.get(`/api/setstatus/${id}/`, {
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


