import { useQuery } from '@tanstack/react-query';
import { GetAudit } from './get&postAudit'; 

const useGetAudit = (trace_code) => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['GetAudit'],
    queryFn: () => GetAudit(trace_code),
  });
  return {
    data,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useGetAudit;


