import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';

export const useGetPic = (trace_code) => {

  const getPic = async () => {
    const response = await api.get(`/api/send/picture/${trace_code}/`);
    return response.data;
  };


  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['planPic', trace_code],
    queryFn: () => getPic(trace_code),
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
