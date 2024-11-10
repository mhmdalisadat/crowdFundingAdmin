import { useQuery } from '@tanstack/react-query';
import { getCardStatusRisk } from './api';

const useGetCardStatusRisk = (cartId) => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['StatusRisk', cartId],
    queryFn: () => getCardStatusRisk(cartId),
  });
  return {
    data,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useGetCardStatusRisk;


