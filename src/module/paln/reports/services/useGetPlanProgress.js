import { useQuery } from '@tanstack/react-query';
import { GetProgress } from './get&postProgress';

const useGetProgress = (trace_code) => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['getPlanProgress'],
    queryFn: () => GetProgress(trace_code),
  });
  return {
    data,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useGetProgress;
