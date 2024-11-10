import { useMutation } from '@tanstack/react-query';
import { postCardStatusRisk } from './api';

const usePostCardStatusRisk = (id) => {
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ['StatusRisk', id],
    mutationFn: (data) => postCardStatusRisk(id, data),
  });
  return {
    mutate,
    isPending,
    isError,
    isSuccess,
  };
};

export default usePostCardStatusRisk;
