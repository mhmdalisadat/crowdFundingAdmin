import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';

export const useGetAddInfo = (trace_code) => {
  const getInfo = async () => {
    const response = await api.get(`/api/information/plan/admin/${trace_code}/`);
    return response.data;
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['addInformation', trace_code],
    queryFn: () => getInfo(trace_code),
    enabled: !!trace_code,
    retry: 1,
    staleTime: 10000,
    cacheTime: 300000,
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
