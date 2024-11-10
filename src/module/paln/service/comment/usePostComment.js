import { useMutation } from '@tanstack/react-query';
import useGetComment from './useGetComment';
import { postComment } from './api';

const usePostcomment = (id,formData,trace_code) => {
  const { refetch } = useGetComment(trace_code);
  const { date, mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ['postComment', id],
    mutationFn: () => postComment(id, formData),
    onSettled: () => {
      refetch();
    },
  });
  return {
    date,
    mutate,
    isPending,
    isError,
    isSuccess,
  };
};

export default usePostcomment;
