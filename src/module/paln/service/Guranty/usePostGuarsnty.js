import { useMutation } from '@tanstack/react-query';
import { PostGuaranty } from './api';
import useGetGuaranty from './useGetGuaranty';

const usePostGuaranty = (trace_code) => {
  const { refetch } = useGetGuaranty(trace_code);
  const { data, mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ['postGuaranty', trace_code],
    mutationFn: (dataToSubmit) => PostGuaranty(trace_code, dataToSubmit),
    onSettled: () => {
        refetch();
      },
  });

  return {
    data,
    mutate,
    isPending,
    isError,
    isSuccess,
  };
};

export default usePostGuaranty;
