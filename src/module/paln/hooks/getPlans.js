import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

export const useGetPlans = () => {
  const accessApi = getCookie('accessApi');

  const getPlans = async () => {
    const response = await api.get(`/api/plans/`, {
      headers: {
        Authorization: `Bearer ${accessApi}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  };

  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: ['plans'],
    queryFn: getPlans,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 3,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error, isError, refetch };
};
