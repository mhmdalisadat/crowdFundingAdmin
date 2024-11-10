import { useMutation } from '@tanstack/react-query';
import useGetHistory from './useGetHistory';
import { postHistory } from './api';

const usePostHistory = (cartId) => {
  const { refetch } = useGetHistory(cartId);
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationKey: ['history'],
    mutationFn: ({ formData }) => postHistory({ cartId, formData }),
    onSettled: () => {
      refetch();
    },
  });
  return {
    mutate,
    isPending,
    isSuccess,
    isError,
    error,
  };
};

export default usePostHistory;
