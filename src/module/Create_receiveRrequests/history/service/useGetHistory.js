import { useQuery } from '@tanstack/react-query';
import { getHistory } from './api';

const useGetHistory = (cartId) => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['history', cartId],
    queryFn: () => getHistory(cartId),
  });
  return {
    data,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useGetHistory;
