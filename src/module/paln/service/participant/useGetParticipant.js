import { useQuery } from '@tanstack/react-query';
import { GetParticipant } from './api';

const useGetParticipant = (trace_code) => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['participant', trace_code],
    queryFn: () => GetParticipant(trace_code),
  });
  return {
    data,
    isPending,
    isError,
    error,
    refetch,
  };
};


export default useGetParticipant;
