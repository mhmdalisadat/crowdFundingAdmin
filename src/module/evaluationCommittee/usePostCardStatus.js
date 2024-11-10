import { useMutation } from '@tanstack/react-query';
import { postCardStatusEvaluation } from './api';

const usePostCardStatusEvaluation = (id) => {
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ['PostCardStatusEvaluation ', id],
    mutationFn: (data) => postCardStatusEvaluation(id, data),
  });
  return {
    mutate,
    isPending,
    isError,
    isSuccess,
  };
};

export default usePostCardStatusEvaluation;
