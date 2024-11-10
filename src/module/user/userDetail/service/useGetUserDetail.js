import { useQuery } from '@tanstack/react-query';
import { getUserDetail } from './api';

const useGetUserDetail = (userId) => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['getUserDetail'],
    queryFn: () => getUserDetail(userId),
  });
  return {
    data,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useGetUserDetail;
