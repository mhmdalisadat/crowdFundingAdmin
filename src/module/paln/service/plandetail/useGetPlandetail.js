import { useQuery } from '@tanstack/react-query';
import { GetDetailPlan } from './api';

const useGetPlanDetail = (trace_code) => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['planDetail',trace_code],
    queryFn: () => GetDetailPlan(trace_code),
  });
  return {
    data,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useGetPlanDetail;
