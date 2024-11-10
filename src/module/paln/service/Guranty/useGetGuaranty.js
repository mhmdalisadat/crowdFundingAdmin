import { useQuery } from '@tanstack/react-query';
import { getGuaranty } from './api';

const useGetGuaranty = (trace_code) => {
  const { data, isPending, error,refetch } = useQuery({
    queryKey: ['getGuaranty', trace_code],
    queryFn: () => getGuaranty(trace_code),
    enabled: !!trace_code,
  });
  return {
    data,
    isPending,
    error,
    refetch
  };
};

export default useGetGuaranty;
