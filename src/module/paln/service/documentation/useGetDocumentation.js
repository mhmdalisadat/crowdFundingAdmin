import { useQuery } from '@tanstack/react-query';
import { GetDocument } from './api';

const useGetDocumentation = (trace_code) => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['documentation',trace_code],
    queryFn: () => GetDocument(trace_code),
  });
  return {
    data,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useGetDocumentation;
