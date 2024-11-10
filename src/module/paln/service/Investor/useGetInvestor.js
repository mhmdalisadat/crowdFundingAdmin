import { useQuery } from '@tanstack/react-query';
import { getPlan } from './api';

const useGetPlan = (trace_code) => {
  const { data, isPending, error } = useQuery({
    queryKey: ['InvestorPlan', trace_code],
    queryFn: () => getPlan(trace_code),
    enabled: !!trace_code,
  });
  return {
    data,
    isPending,
    error,
  };
};


export default useGetPlan;
