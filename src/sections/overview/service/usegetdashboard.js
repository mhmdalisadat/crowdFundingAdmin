import { useQuery } from '@tanstack/react-query';
import { getDashboard } from './dashboard';

const useGetDashboard = () => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['getDashboard'],
    queryFn: () => getDashboard(),
  });
  return {
    data,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useGetDashboard;


