import { useQuery } from '@tanstack/react-query';
import { getCards } from './cartService';

const useGetCards = (cartId) => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['history', cartId],
    queryFn: () => getCards(cartId),
  });
  return {
    data,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useGetCards;
