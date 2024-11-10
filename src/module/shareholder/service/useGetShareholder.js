import { useQuery } from '@tanstack/react-query';
import { fetchShareholder } from './shereholderservice';

const useGetShereholder = (cartId) => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['GetShreholder', cartId],
    queryFn: () => fetchShareholder(cartId),
  });
  return {
    data,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useGetShereholder;
