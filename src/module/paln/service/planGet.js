import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const usePlanGet = (id) => {
  const accessApi = getCookie('accessApi');

  const getPlan = async () => {
    const response = await api.get(`/api/plan/admin/${id}/`, {
      headers: {
        Authorization: `Bearer ${accessApi}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  };

  const { data } = useQuery({
    queryKey: ['planGet', id],
    queryFn: () => getPlan(id),
  });
  return { data };
};

export default usePlanGet;
