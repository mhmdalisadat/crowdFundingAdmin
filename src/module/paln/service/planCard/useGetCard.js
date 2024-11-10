import { useQuery } from '@tanstack/react-query';
import { GetCardPlan } from './api';

const useGetCard = () => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['plan'],
    queryFn: () => GetCardPlan(),
  });
  return {
    data,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useGetCard;
