import { useQuery } from '@tanstack/react-query';
import { GetProfit } from './api/profitGet';

const useGetProfit = (trace_code) => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['profit',trace_code],
    queryFn: () => GetProfit(trace_code),
  });
  return {
    data,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useGetProfit;
