import { useQuery } from '@tanstack/react-query';
import { getCardStatusEvaluation } from './api';

const useGetCardStatusEvaluation = (cartId) => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['StatusEvaluation ', cartId],
    queryFn: () => getCardStatusEvaluation(cartId),
  });
  return {
    data,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useGetCardStatusEvaluation;
