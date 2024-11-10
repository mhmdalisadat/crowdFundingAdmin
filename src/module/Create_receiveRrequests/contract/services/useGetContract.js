import { useQuery } from '@tanstack/react-query';
import { getcontract } from './api';

const useGetContract = (cartId) => {
  const { data, refetch, isPending, error, isError } = useQuery({
    queryKey: ['contract',cartId],
    queryFn: () => getcontract(cartId),
  });
  return {
    data,
    refetch,
    isPending,
    error,
    isError,
  };
};

export default useGetContract;
