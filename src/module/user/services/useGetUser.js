import { useQuery } from '@tanstack/react-query';
import { getUser } from './api';

const useGetUser = () => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['getUser'],
    queryFn: () => getUser(),
  });
  return {
    data,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useGetUser;


